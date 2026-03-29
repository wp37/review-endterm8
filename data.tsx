import React, { useState } from 'react';
import {
  Globe,
  FlaskConical,
  Rocket,
  Zap,
  Info,
  AlertTriangle,
  CheckCircle2,
  Mic,
  ClipboardCheck,
  RotateCcw,
  Star,
  TreePine,
  Cpu,
  Stars,
  Leaf,
  Wind
} from 'lucide-react';
import { Lesson, VocabItem, ExerciseItem, QuizQuestion } from './types';

// --- REUSABLE COMPONENTS ---

const VocabTable: React.FC<{ items: VocabItem[], colorTheme: string }> = ({ items, colorTheme }) => (
  <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className={`${colorTheme} text-white`}>
          <tr>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Từ vựng (Word)</th>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">IPA & Loại từ</th>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Phân tích & Ngữ cảnh</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50 transition-colors group">
              <td className="px-6 py-4">
                <span className="font-bold text-gray-900 text-base block">{item.word}</span>
              </td>
              <td className="px-6 py-4">
                <span className="font-mono text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded-md border border-gray-200">{item.ipa}</span>
              </td>
              <td className="px-6 py-4 text-gray-700">
                <div dangerouslySetInnerHTML={{ __html: item.meaning }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const GrammarBox: React.FC<{
  title: string;
  rule: React.ReactNode;
  examples: { correct: string; incorrect?: string; explain?: string }[];
  color: string
}> = ({ title, rule, examples, color }) => (
  <div className="mb-8 rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white">
    <div className={`${color} px-6 py-4 border-b border-white/10`}>
      <h3 className="text-white font-bold text-lg flex items-center gap-2">
        <Zap className="w-5 h-5 fill-current" /> {title}
      </h3>
    </div>
    <div className="p-6">
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6 font-medium text-gray-800">
        {rule}
      </div>
      <div className="space-y-4">
        {examples.map((ex, idx) => (
          <div key={idx} className="relative pl-4 border-l-4 border-l-transparent hover:border-l-indigo-500 transition-all">
            <div className="flex items-start gap-3 mb-1">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <p className="text-green-800 font-medium bg-green-50 px-2 py-1 rounded inline-block">{ex.correct}</p>
            </div>
            {ex.incorrect && (
              <div className="flex items-start gap-3 mb-1">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-red-800 line-through decoration-red-500/50 bg-red-50 px-2 py-1 rounded inline-block">{ex.incorrect}</p>
              </div>
            )}
            {ex.explain && (
              <p className="text-sm text-gray-500 italic ml-8 mt-1 border-t border-dashed border-gray-200 pt-1">💡 {ex.explain}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ExerciseCard: React.FC<{ item: ExerciseItem, idx: number }> = ({ item, idx }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex gap-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold text-sm shrink-0">
          {idx + 1}
        </span>
        <div className="grow">
          <p className="font-medium text-gray-800 text-lg mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.question }}></p>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              {showAnswer ? 'Ẩn đáp án' : 'Xem đáp án'}
            </button>
          </div>
          {showAnswer && (
            <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <span className="text-green-800 font-bold block mb-1">Giải thích chi tiết:</span>
                <span className="text-green-900" dangerouslySetInnerHTML={{ __html: item.answer }}></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PhoneticCard: React.FC<{ pair: string, words: string[], tip: string }> = ({ pair, words, tip }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-indigo-200 transition-colors h-full flex flex-col">
    <div className="flex items-center justify-between mb-4">
      <span className="text-2xl font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl">{pair}</span>
      <Mic className="text-gray-400 w-6 h-6" />
    </div>
    <div className="flex flex-wrap gap-2 mb-4 grow content-start">
      {words.map((w, i) => (
        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:bg-indigo-50 hover:text-indigo-700 transition-colors cursor-default">
          {w}
        </span>
      ))}
    </div>
    <p className="text-sm text-gray-600 italic bg-yellow-50 p-3 rounded-lg border border-yellow-100 mt-auto">
      <span className="font-bold text-yellow-700 not-italic">Quy tắc:</span> {tip}
    </p>
  </div>
);

// ============================================================
// UNIT 10: ECOTOURISM (Du lịch sinh thái)
// ============================================================

const unit10Vocab: VocabItem[] = [
  { word: "Ecotourism", ipa: "/ˈiːkəʊˌtʊərɪzəm/ (n)", meaning: "<strong>Du lịch sinh thái</strong>. Du lịch có trách nhiệm với thiên nhiên.<br/><em class='text-xs text-gray-500'>Collocation: promote ecotourism.</em>" },
  { word: "Sustainable", ipa: "/səˈsteɪnəbl/ (adj)", meaning: "<strong>Bền vững</strong>. Có thể duy trì lâu dài mà không gây hại.<br/><em class='text-xs text-gray-500'>Family: sustainability (n).</em>" },
  { word: "Wildlife", ipa: "/ˈwaɪldlaɪf/ (n)", meaning: "<strong>Động vật hoang dã</strong>. Các loài sống tự nhiên trong rừng/biển.<br/><em class='text-xs text-gray-500'>Collocation: wildlife conservation.</em>" },
  { word: "Conservation", ipa: "/ˌkɒnsəˈveɪʃn/ (n)", meaning: "<strong>Sự bảo tồn</strong>. Hành động giữ gìn tài nguyên thiên nhiên.<br/><em class='text-xs text-gray-500'>Family: conserve (v), conservationist (n).</em>" },
  { word: "Rainforest", ipa: "/ˈreɪnˌfɒrɪst/ (n)", meaning: "<strong>Rừng nhiệt đới ẩm</strong>. Rừng ở vùng nhiệt đới với lượng mưa lớn.<br/><em class='text-xs text-gray-500'>Ví dụ: the Amazon rainforest.</em>" },
  { word: "Biodiversity", ipa: "/ˌbaɪəʊdaɪˈvɜːsəti/ (n)", meaning: "<strong>Đa dạng sinh học</strong>. Sự phong phú của các loài sinh vật.<br/><em class='text-xs text-gray-500'>Collocation: protect biodiversity.</em>" },
  { word: "Eco-friendly", ipa: "/ˌiːkəʊ ˈfrendli/ (adj)", meaning: "<strong>Thân thiện với môi trường</strong>. Không gây hại cho hệ sinh thái.<br/><em class='text-xs text-gray-500'>Đồng nghĩa: environmentally friendly.</em>" },
  { word: "Trek", ipa: "/trek/ (v, n)", meaning: "<strong>Đi bộ đường dài / leo núi</strong>. Hành trình khám phá thiên nhiên.<br/><em class='text-xs text-gray-500'>Ví dụ: trek through the jungle.</em>" },
  { word: "Local community", ipa: "/ˌləʊkl kəˈmjuːnəti/ (n)", meaning: "<strong>Cộng đồng địa phương</strong>. Người dân sinh sống tại một khu vực.<br/><em class='text-xs text-gray-500'>Collocation: support local communities.</em>" },
  { word: "Nature reserve", ipa: "/ˈneɪtʃə rɪˌzɜːv/ (n)", meaning: "<strong>Khu bảo tồn thiên nhiên</strong>. Vùng đất được bảo vệ đặc biệt.<br/><em class='text-xs text-gray-500'>Ví dụ: Cát Tiên Nature Reserve.</em>" },
  { word: "Deforestation", ipa: "/ˌdiːˌfɒrɪˈsteɪʃn/ (n)", meaning: "<strong>Nạn phá rừng</strong>. Việc chặt phá rừng quy mô lớn.<br/><em class='text-xs text-gray-500'>Family: deforest (v).</em>" },
  { word: "Responsible", ipa: "/rɪˈspɒnsəbl/ (adj)", meaning: "<strong>Có trách nhiệm</strong>. Thực hiện du lịch có ý thức.<br/><em class='text-xs text-gray-500'>Collocation: responsible tourism.</em>" },
];

const unit10Exercises: ExerciseItem[] = [
  { id: 1, question: "Have you ever _______ (visit) Ha Long Bay?<br/>(Chia động từ trong ngoặc)", answer: "<strong>visited</strong>.<br/>💡 Dấu hiệu: <em>Have you ever</em> → <strong>Hiện tại hoàn thành</strong>: S + have/has + V3.<br/>⚠️ Nhớ: ever = đã từng (dùng trong câu hỏi)." },
  { id: 2, question: "She _______ (never / try) ecotourism before.<br/>(Chia động từ)", answer: "<strong>has never tried</strong>.<br/>💡 never = không bao giờ → đứng giữa have/has và V3 trong HTH.<br/>Công thức: S + have/has + never + V3." },
  { id: 3, question: "I _______ already _______ (book) the eco-lodge.<br/>(Chia động từ)", answer: "<strong>have already booked</strong>.<br/>💡 already = đã rồi → đứng giữa have/has và V3.<br/>⚠️ already thường dùng trong câu khẳng định." },
  { id: 4, question: "_______ you _______ (be) to Phong Nha Cave yet?<br/>(Chia động từ)", answer: "<strong>Have you been</strong>.<br/>💡 yet = chưa/rồi → dùng trong câu hỏi và phủ định HTH.<br/>Câu trả lời: Yes, I have. / No, I haven't yet." },
];

// ============================================================
// UNIT 11: SCIENCE & TECHNOLOGY
// ============================================================

const unit11Vocab: VocabItem[] = [
  { word: "Invention", ipa: "/ɪnˈvenʃn/ (n)", meaning: "<strong>Phát minh</strong>. Thứ được tạo ra lần đầu tiên.<br/><em class='text-xs text-gray-500'>Family: invent (v), inventor (n).</em>" },
  { word: "Artificial intelligence", ipa: "/ˌɑːtɪˈfɪʃl ɪnˈtelɪdʒəns/ (n)", meaning: "<strong>Trí tuệ nhân tạo (AI)</strong>. Máy tính mô phỏng tư duy con người.<br/><em class='text-xs text-gray-500'>Viết tắt: AI.</em>" },
  { word: "Robot", ipa: "/ˈrəʊbɒt/ (n)", meaning: "<strong>Robot</strong>. Máy tự động thực hiện công việc.<br/><em class='text-xs text-gray-500'>Collocation: program a robot.</em>" },
  { word: "Solar panel", ipa: "/ˈsəʊlə ˌpænl/ (n)", meaning: "<strong>Tấm pin mặt trời</strong>. Thiết bị chuyển ánh sáng thành điện.<br/><em class='text-xs text-gray-500'>Collocation: install solar panels.</em>" },
  { word: "3D printer", ipa: "/ˌθriː ˈdiː ˌprɪntə/ (n)", meaning: "<strong>Máy in 3D</strong>. In ra vật thể 3 chiều từ bản thiết kế số.<br/><em class='text-xs text-gray-500'>Ví dụ: print objects with a 3D printer.</em>" },
  { word: "Technology", ipa: "/tekˈnɒlədʒi/ (n)", meaning: "<strong>Công nghệ</strong>. Ứng dụng khoa học trong cuộc sống.<br/><em class='text-xs text-gray-500'>Family: technological (adj).</em>" },
  { word: "Electric vehicle", ipa: "/ɪˈlektrɪk ˈviːɪkl/ (n)", meaning: "<strong>Xe điện</strong>. Phương tiện chạy bằng điện.<br/><em class='text-xs text-gray-500'>Viết tắt: EV.</em>" },
  { word: "Wireless", ipa: "/ˈwaɪələs/ (adj)", meaning: "<strong>Không dây</strong>. Kết nối mà không cần cáp.<br/><em class='text-xs text-gray-500'>Ví dụ: wireless internet = wifi.</em>" },
  { word: "Application (app)", ipa: "/ˌæplɪˈkeɪʃn/ (n)", meaning: "<strong>Ứng dụng</strong>. Phần mềm trên điện thoại/máy tính.<br/><em class='text-xs text-gray-500'>Ví dụ: download an app.</em>" },
  { word: "Innovative", ipa: "/ˈɪnəveɪtɪv/ (adj)", meaning: "<strong>Sáng tạo, đổi mới</strong>. Có nhiều ý tưởng mới.<br/><em class='text-xs text-gray-500'>Family: innovation (n).</em>" },
  { word: "Digital", ipa: "/ˈdɪdʒɪtl/ (adj)", meaning: "<strong>Kỹ thuật số</strong>. Liên quan đến dữ liệu số.<br/><em class='text-xs text-gray-500'>Ví dụ: digital camera.</em>" },
  { word: "Launch", ipa: "/lɔːntʃ/ (v)", meaning: "<strong>Ra mắt / phóng lên</strong>. Giới thiệu sản phẩm hoặc phóng tên lửa.<br/><em class='text-xs text-gray-500'>Ví dụ: launch a new phone.</em>" },
];

const unit11Exercises: ExerciseItem[] = [
  { id: 1, question: "The new smartphone _______ (develop) by a Vietnamese company.<br/>(Bị động quá khứ)", answer: "<strong>was developed</strong>.<br/>💡 Bị động quá khứ: S + <strong>was/were + V3</strong>.<br/>smartphone (số ít) → was." },
  { id: 2, question: "Robots _______ (use) in many factories nowadays.<br/>(Bị động hiện tại)", answer: "<strong>are used</strong>.<br/>💡 Bị động hiện tại: S + <strong>am/is/are + V3</strong>.<br/>Robots (số nhiều) → are." },
  { id: 3, question: "A new app _______ (release) next month.<br/>(Bị động tương lai)", answer: "<strong>will be released</strong>.<br/>💡 Bị động tương lai: S + <strong>will be + V3</strong>." },
  { id: 4, question: "The first computer _______ (invent) in the 1940s.<br/>(Bị động quá khứ)", answer: "<strong>was invented</strong>.<br/>💡 Sự kiện quá khứ + bị động → was + V3." },
];

// ============================================================
// UNIT 12: LIFE ON OTHER PLANETS
// ============================================================

const unit12Vocab: VocabItem[] = [
  { word: "Alien", ipa: "/ˈeɪliən/ (n, adj)", meaning: "<strong>Người ngoài hành tinh</strong>. Sinh vật từ thế giới khác.<br/><em class='text-xs text-gray-500'>Ví dụ: do aliens exist?</em>" },
  { word: "Spaceship", ipa: "/ˈspeɪsʃɪp/ (n)", meaning: "<strong>Tàu vũ trụ</strong>. Phương tiện bay trong không gian.<br/><em class='text-xs text-gray-500'>= spacecraft.</em>" },
  { word: "Galaxy", ipa: "/ˈɡæləksi/ (n)", meaning: "<strong>Thiên hà</strong>. Hệ thống hàng tỉ ngôi sao.<br/><em class='text-xs text-gray-500'>Ví dụ: the Milky Way galaxy.</em>" },
  { word: "Orbit", ipa: "/ˈɔːbɪt/ (n, v)", meaning: "<strong>Quỹ đạo / quay xung quanh</strong>.<br/><em class='text-xs text-gray-500'>Ví dụ: The Earth orbits the Sun.</em>" },
  { word: "Gravity", ipa: "/ˈɡrævəti/ (n)", meaning: "<strong>Lực hấp dẫn / trọng lực</strong>.<br/><em class='text-xs text-gray-500'>Collocation: low gravity on the Moon.</em>" },
  { word: "Atmosphere", ipa: "/ˈætməsfɪə/ (n)", meaning: "<strong>Bầu khí quyển</strong>. Lớp khí bao quanh hành tinh.<br/><em class='text-xs text-gray-500'>Ví dụ: Earth's atmosphere.</em>" },
  { word: "Telescope", ipa: "/ˈtelɪskəʊp/ (n)", meaning: "<strong>Kính thiên văn</strong>. Quan sát vật ở xa.<br/><em class='text-xs text-gray-500'>Ví dụ: look through a telescope.</em>" },
  { word: "Astronaut", ipa: "/ˈæstrənɔːt/ (n)", meaning: "<strong>Phi hành gia</strong>. Người bay vào vũ trụ.<br/><em class='text-xs text-gray-500'>Family: astronomy (n).</em>" },
  { word: "Planet", ipa: "/ˈplænɪt/ (n)", meaning: "<strong>Hành tinh</strong>. Thiên thể quay quanh ngôi sao.<br/><em class='text-xs text-gray-500'>Ví dụ: Mars, Venus, Jupiter.</em>" },
  { word: "Exploration", ipa: "/ˌekspləˈreɪʃn/ (n)", meaning: "<strong>Sự khám phá</strong>. Hành trình tìm hiểu điều chưa biết.<br/><em class='text-xs text-gray-500'>Family: explore (v), explorer (n).</em>" },
  { word: "Inhabit", ipa: "/ɪnˈhæbɪt/ (v)", meaning: "<strong>Sinh sống, cư trú</strong>. Sống trong một nơi.<br/><em class='text-xs text-gray-500'>Family: inhabitant (n), habitable (adj).</em>" },
  { word: "Oxygen", ipa: "/ˈɒksɪdʒən/ (n)", meaning: "<strong>Khí oxy</strong>. Khí cần thiết cho sự sống.<br/><em class='text-xs text-gray-500'>Ví dụ: lack of oxygen in space.</em>" },
];

const unit12Exercises: ExerciseItem[] = [
  { id: 1, question: "If I _______ (be) an astronaut, I _______ (travel) to Mars.<br/>(Câu điều kiện loại 2)", answer: "<strong>were / would travel</strong>.<br/>💡 Câu ĐK loại 2 (không có thật):<br/>If + S + <strong>were/V-ed</strong>, S + <strong>would + V</strong>." },
  { id: 2, question: "If there _______ (be) water on Mars, plants _______ (grow) there.<br/>(Câu điều kiện)", answer: "<strong>were / would grow</strong>.<br/>💡 be → luôn dùng <em>were</em> (không dùng was) trong câu ĐK loại 2." },
  { id: 3, question: "If she _______ (have) a spaceship, she _______ (explore) the galaxy.", answer: "<strong>had / would explore</strong>.<br/>💡 If + had (quá khứ đơn) → would + V (nguyên mẫu)." },
  { id: 4, question: "What _______ you do if you _______ (meet) an alien?", answer: "<strong>would / met</strong>.<br/>💡 Câu hỏi ĐK loại 2: What would S do if S + V-ed?" },
];

const review4Exercises: ExerciseItem[] = [
  { id: 1, question: "_______ you ever _______ on a wildlife safari?<br/>A. Have / been &nbsp; B. Did / go &nbsp; C. Was / going &nbsp; D. Are / been", answer: "<strong>A. Have / been</strong>.<br/>💡 ever → Hiện tại hoàn thành: Have + S + V3?" },
  { id: 2, question: "The electric car _______ by the engineer last year.<br/>A. invents B. invented C. was invented D. is invented", answer: "<strong>C. was invented</strong>.<br/>💡 Bị động quá khứ (last year) → was + V3." },
  { id: 3, question: "If I _______ a robot, I wouldn't have to do housework.<br/>A. have B. had C. has D. will have", answer: "<strong>B. had</strong>.<br/>💡 Câu ĐK loại 2: If + quá khứ đơn → would + V." },
  { id: 4, question: "They _______ already _______ the nature reserve.<br/>A. have / visited B. did / visit C. were / visiting D. had / visit", answer: "<strong>A. have / visited</strong>.<br/>💡 already trong HTH: have + already + V3." },
  { id: 5, question: "New apps _______ every day by programmers. (develop - bị động)", answer: "<strong>are developed</strong>.<br/>💡 Bị động hiện tại: are + V3." },
  { id: 6, question: "If there _______ oxygen on Mars, humans _______ live there.", answer: "<strong>were / would live</strong>.<br/>💡 Điều kiện giả định: If + were → would + V." },
];

// ============================================================
// QUIZ QUESTIONS - 70 CÂU (Unit 10, 11, 12, Review 4)
// ============================================================

export const quizQuestions: QuizQuestion[] = [
  // --- UNIT 10: ECOTOURISM ---
  // Vocabulary (5 câu)
  { id: 1, question: "_______ tourism means travelling responsibly to natural areas.", options: ["Eco", "Space", "Shop", "Medical"], correct: 0, explanation: "Ecotourism = du lịch sinh thái, có trách nhiệm.", unit: 10 },
  { id: 2, question: "We must protect _______ to keep ecosystems healthy.", options: ["galaxy", "biodiversity", "orbit", "spaceship"], correct: 1, explanation: "Biodiversity = đa dạng sinh học.", unit: 10 },
  { id: 3, question: "The National Park is a _______ where animals are protected.", options: ["solar panel", "nature reserve", "discount shop", "wireless"], correct: 1, explanation: "Nature reserve = khu bảo tồn thiên nhiên.", unit: 10 },
  { id: 4, question: "Cutting down trees leads to _______, which destroys habitats.", options: ["deforestation", "exploration", "gravity", "atmosphere"], correct: 0, explanation: "Deforestation = nạn phá rừng.", unit: 10 },
  { id: 5, question: "Tourists should choose _______ products to protect the environment.", options: ["toxic", "single-use", "eco-friendly", "volcanic"], correct: 2, explanation: "Eco-friendly = thân thiện với môi trường.", unit: 10 },
  // Grammar - Present Perfect (5 câu)
  { id: 6, question: "_______ you ever _______ to a rainforest?", options: ["Did / go", "Have / been", "Were / going", "Are / going"], correct: 1, explanation: "Ever → Hiện tại hoàn thành: Have + S + V3?", unit: 10 },
  { id: 7, question: "She has _______ visited the wildlife sanctuary.", options: ["never", "yesterday", "ago", "last week"], correct: 0, explanation: "Never dùng trong Hiện tại hoàn thành, không dùng với quá khứ đơn.", unit: 10 },
  { id: 8, question: "They _______ already planted trees in the forest.", options: ["did", "have", "was", "were"], correct: 1, explanation: "Already + V3 trong Hiện tại hoàn thành: have already + V3.", unit: 10 },
  { id: 9, question: "I _______ (never / see) a dugong in real life.", options: ["never saw", "have never seen", "didn't see", "won't see"], correct: 1, explanation: "Have never seen = chưa từng thấy (Hiện tại hoàn thành).", unit: 10 },
  { id: 10, question: "Has she finished her report on ecotourism _______?", options: ["ago", "yesterday", "yet", "last year"], correct: 2, explanation: "Yet dùng trong câu hỏi/phủ định Hiện tại hoàn thành.", unit: 10 },
  // --- UNIT 11: SCIENCE & TECHNOLOGY ---
  // Vocabulary (5 câu)
  { id: 11, question: "Thomas Edison made many great _______ in his lifetime.", options: ["disasters", "inventions", "planets", "tornadoes"], correct: 1, explanation: "Inventions = phát minh.", unit: 11 },
  { id: 12, question: "Many factories now use _______ to do dangerous jobs.", options: ["robots", "aliens", "astronauts", "telescopes"], correct: 0, explanation: "Robots = robot thực hiện công việc nguy hiểm.", unit: 11 },
  { id: 13, question: "_______ panels on the roof can produce electricity from sunlight.", options: ["Solar", "Wireless", "Digital", "Electric"], correct: 0, explanation: "Solar panels = tấm pin mặt trời.", unit: 11 },
  { id: 14, question: "The new phone _______ at a big technology show last week.", options: ["was launched", "is launching", "launches", "launch"], correct: 0, explanation: "Was launched = được ra mắt (bị động quá khứ).", unit: 11 },
  { id: 15, question: "_______ technology makes our world more connected.", options: ["Wireless", "Volcanic", "Toxic", "Sustainable"], correct: 0, explanation: "Wireless = không dây, công nghệ không dây.", unit: 11 },
  // Grammar - Passive Voice (5 câu)
  { id: 16, question: "This app _______ by a student in Vietnam.", options: ["create", "created", "was created", "is create"], correct: 2, explanation: "Bị động quá khứ: was + V3 (created).", unit: 11 },
  { id: 17, question: "Electric vehicles _______ in many countries now.", options: ["use", "used", "are used", "was used"], correct: 2, explanation: "Bị động hiện tại: are + V3. vehicles (số nhiều) → are.", unit: 11 },
  { id: 18, question: "The new hospital _______ next year.", options: ["will build", "will be built", "is built", "was built"], correct: 1, explanation: "Bị động tương lai: will be + V3.", unit: 11 },
  { id: 19, question: "The bicycle _______ (invent) in the 19th century.", options: ["invented", "was invented", "is invented", "invents"], correct: 1, explanation: "Bị động quá khứ với thời điểm cụ thể: was invented.", unit: 11 },
  { id: 20, question: "Many houses in the village _______ (destroy) by the storm.", options: ["are destroying", "were destroyed", "destroy", "destroyed"], correct: 1, explanation: "Bị động quá khứ: were + V3. Houses (số nhiều) → were.", unit: 11 },
  // --- UNIT 12: LIFE ON OTHER PLANETS ---
  // Vocabulary (5 câu)
  { id: 21, question: "A _______ is a vehicle that can travel into outer space.", options: ["telescope", "spaceship", "solar panel", "3D printer"], correct: 1, explanation: "Spaceship = tàu vũ trụ.", unit: 12 },
  { id: 22, question: "The Earth _______ around the Sun once every 365 days.", options: ["orbits", "gravity", "inhabits", "atmospheres"], correct: 0, explanation: "Orbits = quay xung quanh (quỹ đạo).", unit: 12 },
  { id: 23, question: "Scientists use _______ to observe distant stars and planets.", options: ["spaceships", "robots", "telescopes", "apps"], correct: 2, explanation: "Telescopes = kính thiên văn.", unit: 12 },
  { id: 24, question: "The _______ around Mars is very thin and cannot support human life.", options: ["gravity", "atmosphere", "galaxy", "orbit"], correct: 1, explanation: "Atmosphere = bầu khí quyển.", unit: 12 },
  { id: 25, question: "Neil Armstrong was the first _______ to walk on the Moon.", options: ["alien", "astronaut", "explorer", "inventor"], correct: 1, explanation: "Astronaut = phi hành gia.", unit: 12 },
  // Grammar - Conditional Type 2 (5 câu)
  { id: 26, question: "If I _______ a spaceship, I would fly to the Moon.", options: ["have", "had", "has", "will have"], correct: 1, explanation: "Câu ĐK loại 2: If + quá khứ đơn (had), would + V.", unit: 12 },
  { id: 27, question: "If gravity on Earth _______ stronger, we would feel heavier.", options: ["is", "was", "were", "will be"], correct: 2, explanation: "Trong câu ĐK loại 2, be → luôn dùng were.", unit: 12 },
  { id: 28, question: "She _______ the galaxy if she had a powerful telescope.", options: ["explores", "explored", "would explore", "will explore"], correct: 2, explanation: "Vế chính câu ĐK loại 2: would + V (nguyên mẫu).", unit: 12 },
  { id: 29, question: "If aliens _______ on Earth, life would be very different.", options: ["live", "lived", "lives", "will live"], correct: 1, explanation: "If + quá khứ đơn (lived): diễn đạt điều không có thật.", unit: 12 },
  { id: 30, question: "What _______ you do if you _______ to travel to Mars?", options: ["do / get", "would / got", "will / get", "did / gotten"], correct: 1, explanation: "Câu hỏi ĐK loại 2: What would S do if S + V-ed?", unit: 12 },
  // --- REVIEW 4 - Mixed grammar & vocab ---
  { id: 31, question: "They _______ just returned from their ecotourism trip.", options: ["have", "did", "are", "were"], correct: 0, explanation: "Just + V3 → Hiện tại hoàn thành: have just + V3.", unit: 99 },
  { id: 32, question: "This road _______ last month.", options: ["will repair", "repairs", "was repaired", "is repaired"], correct: 2, explanation: "Bị động quá khứ (last month): was repaired.", unit: 99 },
  { id: 33, question: "If the rainforest _______ cut down, many species would disappear.", options: ["is", "was", "were", "will be"], correct: 2, explanation: "Câu ĐK loại 2: If + were + V3 (bị động), would + V.", unit: 99 },
  { id: 34, question: "Has he _______ the latest smartphone yet?", options: ["buy", "buys", "buying", "bought"], correct: 3, explanation: "Have/has + V3 (Hiện tại hoàn thành): bought.", unit: 99 },
  { id: 35, question: "Dogs _______ as guide animals for hundreds of years.", options: ["use", "used", "have been used", "will use"], correct: 2, explanation: "Bị động HTH: have been used = đã được sử dụng.", unit: 99 },
  { id: 36, question: "If she _______ harder, she would pass the exam.", options: ["studies", "studied", "will study", "studying"], correct: 1, explanation: "Câu ĐK loại 2: If + quá khứ đơn (studied).", unit: 99 },
  { id: 37, question: "The local _______ helps protect wildlife in the area.", options: ["community", "galaxy", "atmosphere", "orbit"], correct: 0, explanation: "Local community = cộng đồng địa phương.", unit: 99 },
  { id: 38, question: "AI _______ in many fields such as medicine and education.", options: ["apply", "applies", "is applied", "was apply"], correct: 2, explanation: "Bị động hiện tại: is applied.", unit: 99 },
  { id: 39, question: "I _______ trekking in the Mekong Delta. It was amazing!", options: ["went", "have gone", "go", "was going"], correct: 0, explanation: "Quá khứ đơn với bằng chứng quá khứ ('It was amazing' = hành động đã kết thúc).", unit: 99 },
  { id: 40, question: "If humans _______ on Mars, new problems would arise.", options: ["live", "lived", "will live", "are living"], correct: 1, explanation: "Câu ĐK loại 2: If + lived (quá khứ đơn).", unit: 99 },
  // Extra câu cơ bản (từ 41 đến 55 - dễ/trung bình)
  { id: 41, question: "The smartphone _______ by the company two years ago.", options: ["develops", "developed", "was developed", "is developed"], correct: 2, explanation: "Bị động quá khứ: was developed.", unit: 11 },
  { id: 42, question: "I have _______ been to a national park in Vietnam.", options: ["ever", "never", "yet", "ago"], correct: 1, explanation: "Have never been = chưa từng đến (HTH phủ định).", unit: 10 },
  { id: 43, question: "Hundreds of planets _______ outside our solar system.", options: ["discover", "discovered", "have been discovered", "is discover"], correct: 2, explanation: "Bị động HTH: have been discovered.", unit: 12 },
  { id: 44, question: "If I _______ wings, I would fly to school.", options: ["have", "had", "has", "am having"], correct: 1, explanation: "Điều kiện không có thật: If + had.", unit: 12 },
  { id: 45, question: "The bird species _______ because of habitat destruction.", options: ["is endangered", "endangers", "endanger", "was endangering"], correct: 0, explanation: "Is endangered = đang bị đe dọa (bị động).", unit: 10 },
  { id: 46, question: "New medicines _______ every year by researchers.", options: ["create", "is created", "are created", "were create"], correct: 2, explanation: "Bị động hiện tại: are created (số nhiều).", unit: 11 },
  { id: 47, question: "Have you _______ to any ecotourism destinations in Vietnam?", options: ["go", "went", "gone", "goes"], correct: 2, explanation: "Have + V3: gone (go → went → gone).", unit: 10 },
  { id: 48, question: "If there _______ no pollution, the river would be clean.", options: ["is", "be", "were", "was"], correct: 2, explanation: "Câu ĐK loại 2: be → always WERE.", unit: 12 },
  { id: 49, question: "The satellite _______ into orbit last year.", options: ["launched", "was launched", "is launched", "launches"], correct: 1, explanation: "Bị động quá khứ: was launched.", unit: 11 },
  { id: 50, question: "She has _______ this documentary about space twice.", options: ["watch", "watches", "watched", "watching"], correct: 2, explanation: "Have + V3: watched (xem phim - HTH).", unit: 12 },
  // Phần nâng cao (câu 51-70 - mixed, harder)
  { id: 51, question: "Wildlife _______ (protect) by laws in many countries.", options: ["protects", "is protected", "was protecting", "protect"], correct: 1, explanation: "Bị động hiện tại: is protected.", unit: 10 },
  { id: 52, question: "He wishes he _______ speak to aliens.", options: ["can", "could", "will", "has"], correct: 1, explanation: "Wish + could = mong muốn không có thật (tương tự ĐK loại 2).", unit: 12 },
  { id: 53, question: "How many countries _______ (visit) by the astronaut so far?", options: ["have been visited", "was visited", "visited", "visit"], correct: 0, explanation: "Bị động HTH với 'so far': have been visited.", unit: 12 },
  { id: 54, question: "The 3D printer _______ (just / introduce) to our school.", options: ["has just been introduced", "just introduced", "is just introduce", "just was introduced"], correct: 0, explanation: "Bị động HTH: has just been introduced.", unit: 11 },
  { id: 55, question: "If the government _______ more money into ecotourism, local people would benefit.", options: ["invest", "invested", "investing", "had invested"], correct: 1, explanation: "Câu ĐK loại 2: If + quá khứ đơn (invested).", unit: 10 },
  { id: 56, question: "Many forests _______ destroyed since the last century.", options: ["have been", "were", "was", "are"], correct: 0, explanation: "Since → HTH bị động: have been destroyed.", unit: 10 },
  { id: 57, question: "The robot _______ to perform surgery by the year 2030.", options: ["will be programmed", "programmed", "programs", "is program"], correct: 0, explanation: "Bị động tương lai: will be programmed.", unit: 11 },
  { id: 58, question: "If we _______ renewable energy, we would reduce pollution.", options: ["use", "used", "uses", "using"], correct: 1, explanation: "Câu ĐK loại 2: If + quá khứ đơn (used).", unit: 11 },
  { id: 59, question: "Life on Mars _______ (never / find) by scientists so far.", options: ["has never been found", "never found", "is never found", "never finds"], correct: 0, explanation: "HTH + bị động + never: has never been found.", unit: 12 },
  { id: 60, question: "Plastic bags _______ (ban) in many cities to protect the ocean.", options: ["ban", "have been banned", "was banning", "bans"], correct: 1, explanation: "Bị động HTH: have been banned.", unit: 10 },
  { id: 61, question: "If I _______ the president, I would invest in green technology.", options: ["am", "were", "will be", "had been"], correct: 1, explanation: "Câu ĐK loại 2: If + were (luôn dùng were cho be).", unit: 11 },
  { id: 62, question: "The first satellite _______ by the Soviet Union in 1957.", options: ["launched", "was launched", "has launched", "is launched"], correct: 1, explanation: "Bị động quá khứ với thời điểm cụ thể: was launched.", unit: 12 },
  { id: 63, question: "We _______ on an ecotourism trip three times already.", options: ["go", "went", "have gone", "are going"], correct: 2, explanation: "Three times already → Hiện tại hoàn thành: have gone.", unit: 10 },
  { id: 64, question: "Digital maps _______ by explorers to navigate the jungle.", options: ["are used", "used", "use", "have use"], correct: 0, explanation: "Bị động hiện tại: are used.", unit: 11 },
  { id: 65, question: "If I _______ a telescope, I would study the stars every night.", options: ["own", "owned", "owns", "will own"], correct: 1, explanation: "Câu ĐK loại 2: If + owned (quá khứ đơn).", unit: 12 },
  { id: 66, question: "The conservation programme _______ recently by the government.", options: ["approved", "is approved", "has been approved", "approves"], correct: 2, explanation: "Recently + bị động → HTH: has been approved.", unit: 10 },
  { id: 67, question: "Renewable energy sources _______ to replace fossil fuels.", options: ["develop", "developed", "are being developed", "was developed"], correct: 2, explanation: "Bị động tiếp diễn: are being developed.", unit: 11 },
  { id: 68, question: "If humans _______ in space for long periods, they would need special suits.", options: ["live", "lived", "are living", "will live"], correct: 1, explanation: "Câu ĐK loại 2: If + lived.", unit: 12 },
  { id: 69, question: "The local community _______ involved in sustainable tourism projects.", options: ["has been", "have been", "is been", "was being"], correct: 0, explanation: "has been (số ít/the local community) → has been involved.", unit: 10 },
  { id: 70, question: "If a cure for cancer _______ (find), millions of lives would be saved.", options: ["found", "were found", "finds", "is found"], correct: 1, explanation: "Bị động trong câu ĐK loại 2: If + were found.", unit: 11 },
];

// ============================================================
// LESSONS EXPORT
// ============================================================

export const lessons: Lesson[] = [
  // UNIT 10
  {
    id: 0, title: "Unit 10: Từ vựng Du lịch sinh thái", unit: 10, icon: TreePine,
    color: "from-green-600 to-emerald-500",
    content: (
      <div>
        <div className="bg-green-50 p-6 rounded-2xl mb-8 border border-green-100">
          <h2 className="text-2xl font-bold text-green-800 mb-2">Ecotourism</h2>
          <p className="text-green-700">Từ vựng về du lịch sinh thái, bảo tồn thiên nhiên, đa dạng sinh học.</p>
        </div>
        <VocabTable items={unit10Vocab} colorTheme="bg-gradient-to-r from-green-600 to-emerald-500" />
      </div>
    )
  },
  {
    id: 1, title: "Unit 10: Ngữ pháp Hiện tại hoàn thành", unit: 10, icon: Globe,
    color: "from-emerald-500 to-teal-600",
    content: (
      <div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <p className="text-yellow-800 font-bold">Trọng tâm: Present Perfect – S + have/has + V3</p>
          <p className="text-yellow-700 text-sm mt-1">Dấu hiệu: ever, never, already, yet, just, since, for, recently</p>
        </div>
        <GrammarBox
          title="Thì Hiện tại hoàn thành"
          color="bg-emerald-600"
          rule={
            <div className="space-y-2 text-sm">
              <p><strong>Câu khẳng định:</strong> S + have/has + V3</p>
              <p><strong>Câu phủ định:</strong> S + have/has + not + V3</p>
              <p><strong>Câu hỏi:</strong> Have/Has + S + V3?</p>
              <p className="mt-2 text-emerald-700">• ever/never đứng trước V3 &nbsp; • already đứng trước V3 (KĐ) &nbsp; • yet cuối câu (C.hỏi/PĐ)</p>
            </div>
          }
          examples={[
            { correct: "Have you ever visited Ha Long Bay?", explain: "Ever trong câu hỏi HTH." },
            { correct: "She has never tried ecotourism before.", explain: "Never + HTH: has never + V3." },
            { correct: "I have already booked the eco-lodge.", incorrect: "I already booked the eco-lodge.", explain: "Already → dùng HTH, không dùng quá khứ đơn." },
          ]}
        />
        <div className="space-y-4">
          {unit10Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 2, title: "Unit 10: Ngữ âm /ɪ/ & /iː/", unit: 10, icon: Mic,
    color: "from-teal-500 to-cyan-500",
    content: (
      <div>
        <h2 className="text-2xl font-bold text-teal-800 mb-6">Phân biệt âm /ɪ/ (ngắn) và /iː/ (dài)</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <PhoneticCard pair="/ɪ/ ngắn" words={["bit", "sit", "ship", "fish", "big"]} tip="Miệng hé, không kéo dài. Ví dụ: sit, fish, big." />
          <PhoneticCard pair="/iː/ dài" words={["beat", "seat", "sheep", "tree", "green"]} tip="Kéo dài môi sang hai bên. Ví dụ: see, tree, sleep." />
        </div>
        <div className="mt-8 bg-cyan-50 p-6 rounded-xl border border-cyan-100 text-center">
          <p className="font-bold text-cyan-900 text-lg mb-3">Minimal Pairs</p>
          <div className="flex flex-wrap justify-center gap-6 text-lg font-medium text-cyan-700">
            <span>bit /bɪt/ ↔ beat /biːt/</span>
            <span>ship /ʃɪp/ ↔ sheep /ʃiːp/</span>
          </div>
        </div>
      </div>
    )
  },
  // UNIT 11
  {
    id: 3, title: "Unit 11: Từ vựng Khoa học & Công nghệ", unit: 11, icon: Cpu,
    color: "from-sky-500 to-blue-600",
    content: (
      <div>
        <div className="bg-sky-50 p-6 rounded-2xl mb-8 border border-sky-100">
          <h2 className="text-2xl font-bold text-sky-800 mb-2">Science & Technology</h2>
          <p className="text-sky-700">Từ vựng về phát minh, robot, AI, năng lượng mặt trời và công nghệ hiện đại.</p>
        </div>
        <VocabTable items={unit11Vocab} colorTheme="bg-gradient-to-r from-sky-500 to-blue-600" />
      </div>
    )
  },
  {
    id: 4, title: "Unit 11: Ngữ pháp Câu bị động", unit: 11, icon: FlaskConical,
    color: "from-blue-500 to-indigo-600",
    content: (
      <div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <p className="text-blue-800 font-bold">Passive Voice – Câu bị động</p>
          <p className="text-blue-700 text-sm mt-1">Cấu trúc: <strong>S + be + V3 (+ by + O)</strong></p>
        </div>
        <GrammarBox
          title="Câu bị động – 3 thì cơ bản"
          color="bg-blue-600"
          rule={
            <div className="space-y-2 text-sm">
              <p>• <strong>HTĐ:</strong> S + <strong>am/is/are</strong> + V3</p>
              <p>• <strong>QKĐ:</strong> S + <strong>was/were</strong> + V3</p>
              <p>• <strong>TL:</strong> S + <strong>will be</strong> + V3</p>
              <p className="mt-2 text-blue-700">Số ít → is/was | Số nhiều → are/were</p>
            </div>
          }
          examples={[
            { correct: "Robots are used in many factories.", explain: "Bị động HTĐ: are + V3." },
            { correct: "The phone was invented by Bell.", explain: "Bị động QKĐ: was + V3." },
            { correct: "A new vaccine will be developed next year.", explain: "Bị động TL: will be + V3." },
          ]}
        />
        <div className="space-y-4 mt-8">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 mb-4"><ClipboardCheck className="text-blue-600" /> Luyện tập</h3>
          {unit11Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 5, title: "Unit 11: Ngữ âm – Trọng âm từ", unit: 11, icon: Mic,
    color: "from-indigo-500 to-violet-600",
    content: (
      <div>
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">Word Stress – Trọng âm từ trong khoa học công nghệ</h2>
        <div className="bg-indigo-50 p-4 rounded-xl mb-6 text-indigo-800">
          Quy tắc: Danh từ/tính từ 2 âm tiết → nhấn âm <strong>1</strong>. Động từ 2 âm tiết → nhấn âm <strong>2</strong>.
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <PhoneticCard pair="Nhấn âm 1" words={["RO-bot", "DI-gi-tal", "WIRE-less", "SO-lar", "IN-no-vate"]} tip="Danh từ/tính từ thường nhấn âm đầu." />
          <PhoneticCard pair="Nhấn âm 2/3" words={["tech-NOL-o-gy", "in-VEN-tion", "in-NO-va-tion", "e-LEC-tric"]} tip="Từ -tion, -gy thường nhấn âm tiết trước hậu tố." />
        </div>
      </div>
    )
  },
  // UNIT 12
  {
    id: 6, title: "Unit 12: Từ vựng Cuộc sống trên các hành tinh", unit: 12, icon: Stars,
    color: "from-indigo-600 to-purple-700",
    content: (
      <div>
        <div className="bg-indigo-50 p-6 rounded-2xl mb-8 border border-indigo-100">
          <h2 className="text-2xl font-bold text-indigo-800 mb-2">Life on Other Planets</h2>
          <p className="text-indigo-700">Từ vựng về không gian, hành tinh, phi hành gia và khám phá vũ trụ.</p>
        </div>
        <VocabTable items={unit12Vocab} colorTheme="bg-gradient-to-r from-indigo-600 to-purple-700" />
      </div>
    )
  },
  {
    id: 7, title: "Unit 12: Ngữ pháp Câu điều kiện loại 2", unit: 12, icon: Rocket,
    color: "from-purple-500 to-fuchsia-600",
    content: (
      <div>
        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-8">
          <p className="text-purple-800 font-bold">Conditional Sentence Type 2 – Câu điều kiện loại 2</p>
          <p className="text-purple-700 text-sm mt-1">Diễn đạt điều <strong>không có thật ở hiện tại</strong>.</p>
        </div>
        <GrammarBox
          title="Câu điều kiện loại 2"
          color="bg-purple-600"
          rule={
            <div className="space-y-2 text-sm">
              <p className="text-lg font-bold">If + S + V-ed/were, S + would + V</p>
              <p>• Mệnh đề If: dùng <strong>quá khứ đơn</strong> hoặc <strong>were</strong> (to be)</p>
              <p>• Mệnh đề chính: dùng <strong>would + V nguyên mẫu</strong></p>
              <div className="bg-amber-50 p-2 rounded mt-2 border border-amber-200">
                <p className="text-amber-800">⚠️ to be → luôn dùng <strong>WERE</strong> (không dùng was)</p>
              </div>
            </div>
          }
          examples={[
            { correct: "If I had a spaceship, I would travel to Mars.", explain: "had (QKĐ) → would travel." },
            { correct: "If I were an astronaut, I would walk on the Moon.", incorrect: "If I was an astronaut...", explain: "Be → dùng WERE." },
          ]}
        />
        <div className="space-y-4 mt-8">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 mb-4"><ClipboardCheck className="text-purple-600" /> Luyện tập</h3>
          {unit12Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 8, title: "Unit 12: Ngữ âm – Ngữ điệu (Intonation)", unit: 12, icon: Mic,
    color: "from-fuchsia-500 to-rose-500",
    content: (
      <div>
        <h2 className="text-2xl font-bold text-fuchsia-800 mb-6">Intonation – Ngữ điệu câu hỏi & câu trần thuật</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <PhoneticCard pair="↘ Xuống" words={["Wh- questions", "Statements", "Commands"]} tip="Ngữ điệu đi xuống: câu hỏi Wh-, câu trần thuật, mệnh lệnh." />
          <PhoneticCard pair="↗ Lên" words={["Yes/No questions", "Unfinished lists", "Polite requests"]} tip="Ngữ điệu đi lên: câu hỏi Yes/No, danh sách chưa kết thúc." />
        </div>
      </div>
    )
  },
  // REVIEW 4
  {
    id: 9, title: "Review 4: Ôn tập tổng hợp", unit: 99, icon: RotateCcw,
    color: "from-rose-500 to-pink-600",
    content: (
      <div>
        <div className="bg-rose-50 p-6 rounded-2xl mb-8 border border-rose-100">
          <h2 className="text-2xl font-bold text-rose-800 mb-2">🔄 Review 4: Tổng hợp Unit 10-12</h2>
          <p className="text-rose-700">Ôn tập tổng hợp từ vựng và ngữ pháp từ cả 3 unit cuối kỳ.</p>
        </div>
        <div className="space-y-4">
          {review4Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 10, title: "Review 4: Ngữ pháp tổng hợp", unit: 99, icon: Star,
    color: "from-pink-500 to-rose-600",
    content: (
      <div>
        <div className="bg-pink-50 border-l-4 border-pink-400 p-4 mb-8">
          <p className="text-pink-800 font-bold">Tổng hợp: Present Perfect + Passive Voice + Conditional Type 2</p>
        </div>
        <GrammarBox
          title="1. Hiện tại hoàn thành"
          color="bg-emerald-600"
          rule={<p><strong>S + have/has + V3</strong>. Dấu hiệu: ever, never, already, yet, just, since, for.</p>}
          examples={[{ correct: "We have just planted 100 trees in the forest.", explain: "Just + V3 → HTH." }]}
        />
        <GrammarBox
          title="2. Câu bị động"
          color="bg-blue-600"
          rule={<p><strong>S + be + V3</strong>. HTĐ: is/are + V3 | QKĐ: was/were + V3 | TL: will be + V3.</p>}
          examples={[
            { correct: "Solar panels are installed on many rooftops.", explain: "Bị động HTĐ: are + V3." },
            { correct: "The rocket was launched successfully.", explain: "Bị động QKĐ: was + V3." },
          ]}
        />
        <GrammarBox
          title="3. Câu điều kiện loại 2"
          color="bg-purple-600"
          rule={<p><strong>If + S + V-ed/were, S + would + V</strong>. Điều không có thật ở hiện tại. be → WERE.</p>}
          examples={[
            { correct: "If I were rich, I would build a space museum.", explain: "Were (không dùng was) + would + V." },
          ]}
        />
      </div>
    )
  },
];


