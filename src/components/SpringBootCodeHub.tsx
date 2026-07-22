import React, { useState, useEffect } from 'react';
import { SpringBootFile, fetchSpringBootCode } from '../services/api';
import { soundEngine } from '../utils/audio';
import { Code2, X, Copy, Check, Database, Server, Shield, FileCode, Layers } from 'lucide-react';

interface SpringBootCodeHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpringBootCodeHub: React.FC<SpringBootCodeHubProps> = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState<SpringBootFile[]>([]);
  const [schemaSql, setSchemaSql] = useState('');
  const [activeFile, setActiveFile] = useState<SpringBootFile | null>(null);
  const [activeTab, setActiveTab] = useState<'JAVA' | 'SQL'>('JAVA');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchSpringBootCode()
        .then((res) => {
          setFiles(res.files);
          setSchemaSql(res.schemaSql);
          if (res.files.length > 0) setActiveFile(res.files[0]);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    soundEngine.playPop();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 text-slate-100 rounded-[32px] w-full max-w-5xl h-[85vh] flex flex-col border-4 border-[#EAE6DF] dark:border-slate-700 shadow-2xl overflow-hidden animate-scale-up">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b-2 border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#06D6A0]/20 border-2 border-[#06D6A0] flex items-center justify-center text-[#06D6A0]">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-white text-sm sm:text-base flex items-center space-x-2">
                <span>Spring Boot 3 & MySQL Architecture Hub</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#06D6A0]/20 text-[#06D6A0] text-[10px] font-black border border-[#06D6A0]/40">
                  Production MVC
                </span>
              </h3>
              <p className="text-xs font-semibold text-slate-400">
                Java 21 • Spring Data JPA • JWT Security • MySQL Schema
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                soundEngine.playPop();
                setActiveTab('JAVA');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors ${
                activeTab === 'JAVA' ? 'bg-[#06D6A0] text-slate-950 border-b-2 border-[#04A278]' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Java Codebase
            </button>
            <button
              onClick={() => {
                soundEngine.playPop();
                setActiveTab('SQL');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors ${
                activeTab === 'SQL' ? 'bg-[#FFD166] text-slate-950 border-b-2 border-[#F4A261]' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              MySQL DDL Schema
            </button>
            <button
              onClick={() => { soundEngine.playPop(); onClose(); }}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 flex overflow-hidden">
          {activeTab === 'JAVA' ? (
            <>
              {/* Left File Navigation Tree */}
              <div className="w-64 bg-slate-950/60 border-r-2 border-slate-800 p-3 overflow-y-auto space-y-1">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider px-2 py-1 flex items-center space-x-1">
                  <Layers className="w-3 h-3" />
                  <span>Package Explorer</span>
                </div>
                {files.map((file) => {
                  const isSelected = activeFile?.path === file.path;
                  return (
                    <button
                      key={file.path}
                      onClick={() => {
                        soundEngine.playPop();
                        setActiveFile(file);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-xl text-xs font-mono transition-colors flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#06D6A0]/20 border-2 border-[#06D6A0] text-[#06D6A0] font-black'
                          : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                      }`}
                    >
                      <span className="truncate">{file.path.split('.').slice(-2).join('.')}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-bold">
                        {file.category}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right Code Display */}
              <div className="flex-1 flex flex-col bg-slate-900">
                {activeFile && (
                  <>
                    <div className="p-3 bg-slate-950/40 border-b-2 border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>{activeFile.path}</span>
                      <button
                        onClick={() => handleCopy(activeFile.content)}
                        className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#118AB2] hover:brightness-105 text-white font-black transition-colors"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-[#06D6A0]" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>
                    <div className="flex-1 p-4 overflow-auto font-mono text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/20">
                      <pre><code>{activeFile.content}</code></pre>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            /* MySQL DDL Schema View */
            <div className="flex-1 flex flex-col bg-slate-900">
              <div className="p-3 bg-slate-950/40 border-b-2 border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center space-x-1.5 text-[#FFD166] font-bold">
                  <Database className="w-4 h-4" />
                  <span>schema.sql — MySQL Database Definition Language (DDL)</span>
                </span>
                <button
                  onClick={() => handleCopy(schemaSql)}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#FFD166] text-slate-950 font-black hover:brightness-105 transition-colors border-b-2 border-[#F4A261]"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Schema!' : 'Copy schema.sql'}</span>
                </button>
              </div>
              <div className="flex-1 p-4 overflow-auto font-mono text-xs sm:text-sm text-[#FFD166]/90 leading-relaxed bg-slate-950/30">
                <pre><code>{schemaSql}</code></pre>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

