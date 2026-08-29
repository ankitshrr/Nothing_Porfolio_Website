import { useState, useEffect } from 'react';

export default function useGithubStats(username) {
  const [stats, setStats] = useState({
    total: '—',
    bestDay: '—',
    streak: '—',
    longestStreak: '—',
    streakActive: false,
    longestStreakActive: false
  });

  useEffect(() => {
    if (!username) return;

    const fetchStats = async () => {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
        if (!res.ok) return;
        const data = await res.json();
        const contributions = data.contributions || [];
        
        if (!contributions.length) return;

        // Total & Best Day
        const total = contributions.reduce((s, c) => s + (c.count || 0), 0);
        const bestDay = contributions.reduce((m, c) => c.count > m ? c.count : m, 0);

        const prevDay = (ds) => { 
          const d = new Date(ds); 
          d.setDate(d.getDate() - 1); 
          return d.toISOString().slice(0, 10); 
        };

        const sorted = [...contributions].sort((a, b) => b.date.localeCompare(a.date));
        const todayStr = new Date().toISOString().slice(0, 10);
        const yesterdayStr = prevDay(todayStr);

        // Current Streak
        let streak = 0;
        let expected = todayStr;
        const todayData = sorted.find(c => c.date === todayStr);
        if (!todayData || (todayData.count || 0) === 0) {
          expected = yesterdayStr;
        }

        for (const c of sorted) {
          if (c.date > expected) continue;
          if (c.date === expected) { 
            if ((c.count || 0) > 0) { 
              streak++; 
              expected = prevDay(c.date); 
            } else break;
          } else break;
        }

        // Longest Streak
        const sortedAsc = [...contributions].sort((a, b) => a.date.localeCompare(b.date));
        let maxStreak = 0;
        let curStreak = 0;
        let prev = null;
        for (const c of sortedAsc) {
          if ((c.count || 0) > 0) {
            if (!prev) curStreak = 1;
            else {
              const d = new Date(prev); 
              d.setDate(d.getDate() + 1);
              const exp = d.toISOString().slice(0, 10);
              if (c.date === exp) curStreak++;
              else if (c.date > exp) curStreak = 1;
            }
            if (curStreak > maxStreak) maxStreak = curStreak;
            prev = c.date;
          }
        }

        setStats({
          total: total.toLocaleString(),
          bestDay: bestDay.toLocaleString(),
          streak: streak > 0 ? streak + 'd' : '0d',
          longestStreak: maxStreak > 0 ? maxStreak + 'd' : '0d',
          streakActive: streak > 0,
          longestStreakActive: maxStreak > 0
        });

      } catch (err) {
        console.error("Failed to fetch Github stats:", err);
      }
    };

    fetchStats();
  }, [username]);

  return stats;
}
