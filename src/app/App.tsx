import { useState } from 'react';
import { motion } from 'motion/react';
import { Wheat, Fish, ChevronRight, Download, Package } from 'lucide-react';

type ContentType = 'Custom-Crops' | 'Custom-Fishing' | null;
type PluginType = 'CraftEngine' | 'ItemsAdder' | 'Nexo' | 'Oraxen' | null;
type PluginOption = 'Block' | 'Block Entity' | 'Item_Frame' | 'Tripwire' | 'Furniture' | null;

interface PluginConfig {
  name: PluginType;
  description: string;
  options: PluginOption[];
}

const plugins: PluginConfig[] = [
  {
    name: 'CraftEngine',
    description: '강력한 블록 및 엔티티 생성 엔진',
    options: ['Block', 'Block Entity']
  },
  {
    name: 'ItemsAdder',
    description: '커스텀 아이템 및 블록 추가',
    options: ['Item_Frame', 'Tripwire']
  },
  {
    name: 'Nexo',
    description: '가구 및 장식 아이템 시스템',
    options: ['Furniture', 'Tripwire']
  },
  {
    name: 'Oraxen',
    description: '커스텀 리소스 관리 플러그인',
    options: ['Furniture', 'Tripwire']
  },
];

export default function App() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedContent, setSelectedContent] = useState<ContentType>(null);
  const [selectedPlugin, setSelectedPlugin] = useState<PluginType>(null);
  const [selectedOption, setSelectedOption] = useState<PluginOption>(null);

  const handleContentSelect = (content: ContentType) => {
    setSelectedContent(content);
  };

  const handlePluginSelect = (plugin: PluginType) => {
    setSelectedPlugin(plugin);
    setSelectedOption(null);
  };

  const handleOptionSelect = (option: PluginOption) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (step === 1 && selectedContent) {
      setStep(2);
    } else if (step === 2 && selectedPlugin && selectedOption) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedPlugin(null);
      setSelectedOption(null);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handleDownload = () => {
    alert(`다운로드 시작!\n\n선택한 구성:\n- ${selectedContent}\n- ${selectedPlugin}\n- ${selectedOption}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="w-10 h-10 text-primary" />
            <h1 className="text-4xl">Minecraft Plugin Downloader</h1>
          </div>
          <p className="text-muted-foreground">원하는 플러그인 조합을 선택하고 다운로드하세요</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  step >= num
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                {num}
              </div>
              {num < 3 && (
                <div
                  className={`w-16 h-1 mx-2 transition-all ${
                    step > num ? 'bg-primary' : 'bg-secondary'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Content Selection */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-center mb-8">콘텐츠 선택</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleContentSelect('Custom-Crops')}
                className={`bg-card p-8 rounded-3xl shadow-lg transition-all ${
                  selectedContent === 'Custom-Crops'
                    ? 'ring-4 ring-primary shadow-2xl'
                    : 'hover:shadow-xl'
                }`}
              >
                <Wheat className="w-20 h-20 mx-auto mb-4 text-primary" />
                <h3 className="mb-2">Custom-Crops</h3>
                <p className="text-muted-foreground text-sm">커스텀 농작물 및 작물 시스템</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleContentSelect('Custom-Fishing')}
                className={`bg-card p-8 rounded-3xl shadow-lg transition-all ${
                  selectedContent === 'Custom-Fishing'
                    ? 'ring-4 ring-primary shadow-2xl'
                    : 'hover:shadow-xl'
                }`}
              >
                <Fish className="w-20 h-20 mx-auto mb-4 text-primary" />
                <h3 className="mb-2">Custom-Fishing</h3>
                <p className="text-muted-foreground text-sm">커스텀 낚시 시스템 및 물고기</p>
              </motion.button>
            </div>

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                disabled={!selectedContent}
                className={`px-8 py-4 rounded-2xl flex items-center gap-2 transition-all ${
                  selectedContent
                    ? 'bg-primary text-primary-foreground shadow-lg hover:shadow-xl'
                    : 'bg-secondary text-muted-foreground cursor-not-allowed'
                }`}
              >
                다음 단계
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Plugin Selection */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-center mb-8">플러그인 선택</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {plugins.map((plugin) => (
                <motion.div
                  key={plugin.name}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handlePluginSelect(plugin.name)}
                  className={`bg-card p-6 rounded-3xl shadow-lg cursor-pointer transition-all ${
                    selectedPlugin === plugin.name
                      ? 'ring-4 ring-primary shadow-2xl'
                      : 'hover:shadow-xl'
                  }`}
                >
                  <h3 className="mb-2">{plugin.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plugin.description}</p>

                  {selectedPlugin === plugin.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pt-4 border-t border-border"
                    >
                      <p className="text-sm mb-3">방식 선택:</p>
                      <div className="flex flex-wrap gap-2">
                        {plugin.options.map((option) => (
                          <motion.button
                            key={option}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOptionSelect(option);
                            }}
                            className={`px-4 py-2 rounded-xl text-sm transition-all ${
                              selectedOption === option
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary hover:bg-muted'
                            }`}
                          >
                            {option}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="flex justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="px-8 py-4 rounded-2xl bg-secondary hover:bg-muted transition-all"
              >
                이전
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                disabled={!selectedPlugin || !selectedOption}
                className={`px-8 py-4 rounded-2xl flex items-center gap-2 transition-all ${
                  selectedPlugin && selectedOption
                    ? 'bg-primary text-primary-foreground shadow-lg hover:shadow-xl'
                    : 'bg-secondary text-muted-foreground cursor-not-allowed'
                }`}
              >
                다음 단계
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Download Page */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <h2 className="mb-8">다운로드 준비 완료</h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card p-8 rounded-3xl shadow-xl mb-8 max-w-2xl mx-auto"
            >
              <h3 className="mb-6">선택한 구성</h3>

              <div className="space-y-4 text-left">
                <div className="bg-secondary p-4 rounded-2xl">
                  <p className="text-sm text-muted-foreground mb-1">콘텐츠</p>
                  <p>{selectedContent}</p>
                </div>

                <div className="bg-secondary p-4 rounded-2xl">
                  <p className="text-sm text-muted-foreground mb-1">플러그인</p>
                  <p>{selectedPlugin}</p>
                </div>

                <div className="bg-secondary p-4 rounded-2xl">
                  <p className="text-sm text-muted-foreground mb-1">방식</p>
                  <p>{selectedOption}</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border text-left">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">버전</p>
                    <p>v1.0.0</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">업데이트</p>
                    <p>2024.05.20</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">지원 버전</p>
                    <p>1.20.x ~ 1.21.x</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">파일 크기</p>
                    <p>2.4 MB</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="px-12 py-5 rounded-2xl bg-primary text-primary-foreground shadow-lg hover:shadow-2xl transition-all flex items-center gap-3 mx-auto mb-8"
            >
              <Download className="w-6 h-6" />
              다운로드
            </motion.button>

            <div className="mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="px-8 py-3 rounded-2xl bg-secondary hover:bg-muted transition-all"
              >
                이전
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
