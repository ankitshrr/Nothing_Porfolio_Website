import { useState, useEffect } from 'react';

const GH_USER = 'ankitshrr';

export default function useGithub() {
  const [stats, setStats] = useState({
    total: 0,
    best: 0,
    streak: 0,
    longestStreak: 0,
    loading: true
  });

  useEffect(() => {
    let isMounted = true;
    
    async function fetchContributions() {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`);
        if (!res.ok) return;
        
        const data = await res.json();
        const contributions = data.contributions || [];
        
        if (!contributions.length || !isMounted) return;

        // Calculate streaks
        const prevDay = (ds) => { const d=new Date(ds); d.setDate(d.getDate()-1); return d.toISOString().slice(0,10); }
        const sorted = [...contributions].sort((a,b)=>b.date.localeCompare(a.date));
        
        const todayStr = new Date().toISOString().slice(0,10);
        const yesterdayStr = prevDay(todayStr);
        
        let streak = 0, expected = todayStr;
        const todayData = sorted.find(c => c.date === todayStr);
        
        if (!todayData || (todayData.count || 0) === 0) {
          expected = yesterdayStr;
        }

        for(const c of sorted){
          if(c.date > expected) continue;
          if(c.date === expected) { 
            if((c.count || 0) > 0) { streak++; expected = prevDay(c.date); }
            else break; 
          }
          else break;
        }

        const sortedAsc = [...contributions].sort((a,b)=>a.date.localeCompare(b.date));
        let maxStreak = 0, curStreak = 0, prevDate = null;
        for(const c of sortedAsc){
          if((c.count || 0) > 0){
            if(!prevDate) curStreak = 1;
            else{
              const d = new Date(prevDate); d.setDate(d.getDate()+1);
              const exp = d.toISOString().slice(0,10);
              if(c.date === exp) curStreak++;
              else if(c.date > exp) curStreak = 1;
            }
            if(curStreak > maxStreak) maxStreak = curStreak;
            prevDate = c.date;
          }
        }

        const total = contributions.reduce((s,c)=>s+(c.count||0),0);
        const best  = contributions.reduce((m,c)=>c.count>m?c.count:m,0);

        if (isMounted) {
          setStats({
            total,
            best,
            streak,
            longestStreak: maxStreak,
            loading: false
          });
        }
      } catch (err) {
        console.error("Failed to fetch Github stats", err);
      }
    }

    fetchContributions();
    
    return () => { isMounted = false; }
  }, []);

  return stats;
}
