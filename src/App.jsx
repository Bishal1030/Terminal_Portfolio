import React, { useState } from 'react';

import styled from 'styled-components';

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #9facb9;
  display: grid;
  place-content: center;
  color: #fff;
`;

const TerminalWrapper = styled.section`
  background-color: #011727;
  padding: 1rem;
  max-width: 640px;
  width: 640px;
  border-radius: 0 0 10px 10px;
  height: 400px;
  overflow-y: scroll;
  box-shadow: 0 0 25px 2px #011727d6;
`;

const TerminalToolbar = styled.section`
  background-color: #fff;
  padding: 8px;
  border-radius: 10px 10px 0 0;
  display: flex;

  p {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    margin-right: 4px;
    cursor: pointer;
  }
`;

const TerminalPrompt = styled.section`
  margin: 1rem 0;
  span {
    display: inline;
    color: #78edaa;
  }
`;

const TerminalPromptInput = styled.input`
  outline: none;
  margin-left: 1rem;
  border: none;
  background-color: transparent;
  caret-color: #78edaa;
  color: #78edaa;
  font-family: inherit;
  font-size: 1rem;
`;

const TerminalOutputPrompt = styled.section`
  margin: 1rem 0;

  .cmdInfo {
    display: flex;
    p {
      margin-left: 16px;
    }
  }
  .cmdOutput {
    p {
      color: #c9c9c9;
    }
  }
`;

const App = () => {
  const [cmd, setCmd] = useState('');
  const [output, setOutput] = useState([]);

  const CMDs = {
    help: () => {
      setOutput((prev) => [
        ...prev,
        {
          cmdInfo: 'help',
          cmdOutput: [
            'help - this help text',
            'github - view my github profile',
            'source - browse the code for this page',
            'clear - clear screen',
            'cat - print contents of a file',
            'ls - list files',
            'resume - view my resume',
            'intro - print intro message',
            'findmeon - list of all my social handles',
          ],
        },
      ]);
    },
    intro: () => {
      setOutput((prev) => [
        ...prev,
        {
          cmdInfo: 'intro',
          cmdOutput: [
            "Hello, I'm Bishal Shahi, a Mern stack Developer. ",
          ],
        },
      ]);
    },
    clear: () => {
      setOutput([]);
    },

    github: () => {
      window.open(`https://github.com/Bishal1030`);
    },
    source: () => {
      window.open(`https://github.com/Bishal1030/Terminal_Portfolio`);
    },
    findmeon: () => {
      window.open(`https://linktr.ee/Bishal_Shahi`);
    },
    resume: () => {
      window.open(
        'https://drive.google.com/file/d/1b6KLYtn2HiKPYSJFBX0CgB0g8HwQ7Kyr/view?usp=sharing'
      );
    },
    ls: () => {
      setOutput((prev) => [
        ...prev,
        {
          cmdInfo: 'ls',
          cmdOutput: ['Readme.md'],
        },
      ]);
    },
    cat: (arg) => {
      if (arg === 'Readme.md') {
        setOutput((prev) => [
          ...prev,
          {
            cmdInfo: `cat ${arg}`,
            cmdOutput: [
              '### Readme.md',
              'Wandering over Internet One day I came across this awesome website - React Term, a terminal simulation in React, so I tried to create a mini version of the  same application with my styles and commands. Hope you like it !!',
            ],
          },
        ]);
      } else {
        setOutput((prev) => [
          ...prev,
          {
            cmdInfo: `cat ${arg}`,
            cmdOutput: ['file not found'],
          },
        ]);
      }
    },
  };

  const handleCommandInput = (e) => {
    if (e.key === 'Enter') {
      const input = cmd.split(' ')[0];
      const arg = cmd.split(' ')[1];

      const cmmand = CMDs[input];

      if (cmmand === undefined) {
        setOutput((prev) => [
          ...prev,
          {
            cmdInfo: cmd,
            cmdOutput: ['cmd not found'],
          },
        ]);
      } else {
        cmmand(arg);
      }
      setCmd('');
    } else {
    }
  };

  const getOutputColor = (output) => {
    if (output === 'file not found' || output === 'cmd not found') {
      return 'red';
    }
    return '#c9c9c9';
  };

  return (
    <PageContainer>
      {/* Application Toolbar */}
      <TerminalToolbar>
        <p
          style={{ backgroundColor: 'red' }}
          onClick={() => {
            window.close();
          }}
        ></p>
        <p style={{ backgroundColor: 'yellow' }}></p>
        <p style={{ backgroundColor: 'green' }}></p>
      </TerminalToolbar>

      <TerminalWrapper>
        <h3>Welcome, I am Bishal Shahi. Feel free to explore me!</h3>
        <p>Type `help` to see what all commands are available</p>

        {/* Outputs */}
        <section>
          {output.map((o, i) => (
            <TerminalOutputPrompt key={i}>
              <section className='cmdInfo'>
                <span>$</span> <p>{o.cmdInfo}</p>
              </section>
              <section className='cmdOutput'>
                {o.cmdOutput.map((op, ind) => (
                  <p
                    style={{
                      color: getOutputColor(op),
                    }}
                    key={ind}
                  >
                    {op}
                  </p>
                ))}
              </section>
            </TerminalOutputPrompt>
          ))}
        </section>

        {/* Command Input */}
        <TerminalPrompt>
          <span>$</span>
          <TerminalPromptInput
            type='text'
            name='cmd'
            autoFocus
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            onKeyPress={handleCommandInput}
          />
        </TerminalPrompt>
      </TerminalWrapper>
    </PageContainer>
  );
};

export default App;
