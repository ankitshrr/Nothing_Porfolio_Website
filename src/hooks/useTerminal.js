import { useState, useEffect, useCallback, useRef } from 'react';

const terminalCommands = [
  {
    cmd: "pytest portfolio.py",
    prompt: "$",
    output: [
      { text: "============================= test session starts ==============================" },
      { text: "platform linux -- Python 3.12, pytest-8.0.0" },
      { text: "collected 3 items" },
      { text: "<br>" },
      { text: "<span class='term-file'>test_ui.py</span> &nbsp; <span class='term-pass'>PASSED</span>" },
      { text: "<span class='term-file'>test_api.py</span> &nbsp; <span class='term-pass'>PASSED</span>" },
      { text: "<span class='term-file'>test_integration.py</span> &nbsp; <span class='term-pass'>PASSED</span>" },
      { text: "<br>" },
      { text: "<span class='term-pass-strong'>============================== 3 passed in 0.42s ===============================</span>" },
      { text: "<span class='term-prompt'>$</span> <span class='term-cursor'></span>", delay: 0 }
    ]
  },
  {
    cmd: "docker build -t qa-env .",
    prompt: "$",
    output: [
      { text: "Sending build context to Docker daemon  2.048kB" },
      { text: "Step 1/5 : FROM python:3.12-slim" },
      { text: "---> 7a46227b0c9f" },
      { text: "Step 2/5 : WORKDIR /app" },
      { text: "---> Using cache" },
      { text: "---> d1b4421b02b9" },
      { text: "Step 3/5 : COPY requirements.txt ." },
      { text: "---> 8a2f4c7b8d11" },
      { text: "Step 4/5 : RUN pip install -r requirements.txt", delay: 300 },
      { text: "---> <span class='term-pass'>Successfully installed pytest-8.0.0</span>" },
      { text: "<span class='term-pass-strong'>Successfully built 9f2e345a1b2c</span>" },
      { text: "<span class='term-pass'>Successfully tagged qa-env:latest</span>" },
      { text: "<span class='term-prompt'>$</span> <span class='term-cursor'></span>", delay: 0 }
    ]
  },
  {
    cmd: "npx cypress run",
    prompt: ">",
    output: [
      { text: "========================================" },
      { text: "  (Run Starting)" },
      { text: "  <span class='term-file'>┌────────────────────────────────────┐</span>" },
      { text: "  <span class='term-file'>│</span> Cypress: 13.6.0                    <span class='term-file'>│</span>" },
      { text: "  <span class='term-file'>│</span> Browser: Electron 114              <span class='term-file'>│</span>" },
      { text: "  <span class='term-file'>│</span> Specs:   1 found                   <span class='term-file'>│</span>" },
      { text: "  <span class='term-file'>└────────────────────────────────────┘</span>" },
      { text: "  Running: <span class='term-file'>portfolio_spec.cy.js</span>", delay: 600 },
      { text: "  <span class='term-pass'>✔</span>  Portfolio loads successfully (842ms)" },
      { text: "  <span class='term-pass'>✔</span>  Navigation links work (1205ms)" },
      { text: "  <span class='term-pass'>✔</span>  Contact form validates (950ms)" },
      { text: "  <span class='term-pass-strong'>All specs passed!</span>" },
      { text: "<span class='term-prompt'>></span> <span class='term-cursor'></span>", delay: 0 }
    ]
  }
];

export default function useTerminal() {
  const [command, setCommand] = useState("");
  const [prompt, setPrompt] = useState("$");
  const [output, setOutput] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const isRunningRef = useRef(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => { isMountedRef.current = false; };
  }, []);

  const runAnimation = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    setCommand("");
    setOutput([]);
    setShowCursor(true);

    const randIndex = Math.floor(Math.random() * terminalCommands.length);
    const selected = terminalCommands[randIndex];
    setPrompt(selected.prompt);

    let charIndex = 0;
    let currentCmd = "";
    
    const typeChar = () => {
      if (!isMountedRef.current) return;
      if (charIndex < selected.cmd.length) {
        currentCmd += selected.cmd.charAt(charIndex);
        setCommand(currentCmd);
        charIndex++;
        setTimeout(typeChar, 30 + Math.random() * 50);
      } else {
        setTimeout(() => {
          if (!isMountedRef.current) return;
          setShowCursor(false);
          executeLines(selected.output);
        }, 300);
      }
    };

    const executeLines = (lines) => {
      let lineIndex = 0;
      
      const showNextLine = () => {
        if (!isMountedRef.current) return;
        if (lineIndex < lines.length) {
          const lineData = lines[lineIndex];
          setOutput(prev => [...prev, lineData.text]);
          
          lineIndex++;
          let waitTime = lineData.delay !== undefined ? lineData.delay : (50 + Math.random() * 100);
          setTimeout(showNextLine, waitTime);
        } else {
          isRunningRef.current = false;
        }
      };
      
      showNextLine();
    };

    setTimeout(typeChar, 400);
  }, []);

  useEffect(() => {
    const timer = setTimeout(runAnimation, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  return { prompt, command, output, showCursor, runAnimation };
}
