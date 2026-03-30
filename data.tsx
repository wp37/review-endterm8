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
  Wind,
  ShoppingBag,
  CloudLightning,
  Recycle,
  BookMarked,
  BookOpenCheck,
  MessageCircle
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
// UNIT 7: ENVIRONMENTAL PROTECTION (Bảo vệ môi trường)
// ============================================================

const unit7Vocab: VocabItem[] = [
  { word: "Pollution", ipa: "/pəˈluːʃn/ (n)", meaning: "<strong>Sự ô nhiễm</strong>. Sự làm bẩn môi trường tự nhiên.<br/><em class='text-xs text-gray-500'>Collocation: air/water/soil pollution.</em>" },
  { word: "Ecosystem", ipa: "/ˈiːkəʊˌsɪstəm/ (n)", meaning: "<strong>Hệ sinh thái</strong>. Cộng đồng sinh vật và môi trường sống.<br/><em class='text-xs text-gray-500'>Collocation: protect ecosystems.</em>" },
  { word: "Recycle", ipa: "/ˌriːˈsaɪkl/ (v)", meaning: "<strong>Tái chế</strong>. Xử lý rác để dùng lại.<br/><em class='text-xs text-gray-500'>Family: recycling (n), recyclable (adj).</em>" },
  { word: "Single-use", ipa: "/ˌsɪŋɡl ˈjuːs/ (adj)", meaning: "<strong>Dùng một lần</strong>. Chỉ sử dụng một lần rồi bỏ.<br/><em class='text-xs text-gray-500'>Ví dụ: single-use plastic bags.</em>" },
  { word: "Endangered species", ipa: "/ɪnˈdeɪndʒəd ˈspiːʃiːz/ (n)", meaning: "<strong>Loài có nguy cơ tuyệt chủng</strong>. Loài sinh vật sắp biến mất.<br/><em class='text-xs text-gray-500'>Ví dụ: tigers are endangered species.</em>" },
  { word: "Habitat", ipa: "/ˈhæbɪtæt/ (n)", meaning: "<strong>Môi trường sống</strong>. Nơi sinh vật sống tự nhiên.<br/><em class='text-xs text-gray-500'>Collocation: destroy habitat.</em>" },
  { word: "Natural resources", ipa: "/ˈnætʃrəl rɪˈzɔːsɪz/ (n)", meaning: "<strong>Tài nguyên thiên nhiên</strong>. Nguồn vật chất có sẵn trong tự nhiên.<br/><em class='text-xs text-gray-500'>Ví dụ: coal, oil, wood.</em>" },
  { word: "Carbon footprint", ipa: "/ˈkɑːbən ˌfʊtprɪnt/ (n)", meaning: "<strong>Dấu chân carbon</strong>. Lượng CO₂ thải ra từ hoạt động của con người.<br/><em class='text-xs text-gray-500'>Collocation: reduce your carbon footprint.</em>" },
  { word: "Deforestation", ipa: "/ˌdiːˌfɒrɪˈsteɪʃn/ (n)", meaning: "<strong>Nạn phá rừng</strong>. Việc chặt phá rừng quy mô lớn.<br/><em class='text-xs text-gray-500'>Family: deforest (v).</em>" },
  { word: "Renewable energy", ipa: "/rɪˈnjuːəbl ˈenədʒi/ (n)", meaning: "<strong>Năng lượng tái tạo</strong>. Năng lượng từ nguồn không cạn kiệt.<br/><em class='text-xs text-gray-500'>Ví dụ: solar, wind, hydro energy.</em>" },
  { word: "Greenhouse effect", ipa: "/ˈɡriːnhaʊs ɪˌfekt/ (n)", meaning: "<strong>Hiệu ứng nhà kính</strong>. Hiện tượng Trái Đất nóng lên do khí CO₂.<br/><em class='text-xs text-gray-500'>Collocation: cause the greenhouse effect.</em>" },
  { word: "Litter", ipa: "/ˈlɪtə/ (v, n)", meaning: "<strong>Xả rác / Rác thải</strong>. Thả rác bừa bãi nơi công cộng.<br/><em class='text-xs text-gray-500'>Collocation: litter the street.</em>" },
];

const unit7Exercises: ExerciseItem[] = [
  { id: 1, question: "While I _______ (walk) to school, it started to rain.<br/>(Chia động từ)", answer: "<strong>was walking</strong>.<br/>💡 While + quá khứ tiếp diễn (past continuous): S + was/were + V-ing.<br/>⚠️ Hành động đang diễn ra bị gián đoạn → was walking." },
  { id: 2, question: "When the earthquake _______ (happen), we _______ (sleep).<br/>(Chia động từ)", answer: "<strong>happened / were sleeping</strong>.<br/>💡 Khi sự kiện ngắn xảy ra (happened) → hành động dài đang diễn ra (were sleeping).<br/>Công thức: When + QKĐ, S + was/were + V-ing." },
  { id: 3, question: "They _______ (watch) TV when the power went out.<br/>(Chia động từ)", answer: "<strong>were watching</strong>.<br/>💡 Hành động đang xảy ra khi có sự kiện khác xen vào → past continuous." },
  { id: 4, question: "_______ you _______ (recycle) your old newspapers regularly?<br/>(Chia động từ - hiện tại đơn)", answer: "<strong>Do / recycle</strong>.<br/>💡 Thói quen hiện tại: Do/Does + S + V(nguyên mẫu)?" },
];

// ============================================================
// UNIT 8: SHOPPING (Mua sắm)
// ============================================================

const unit8Vocab: VocabItem[] = [
  { word: "Shopaholic", ipa: "/ˌʃɒpəˈhɒlɪk/ (n)", meaning: "<strong>Người nghiện mua sắm</strong>. Người không thể nhịn mua đồ.<br/><em class='text-xs text-gray-500'>Ví dụ: She's a real shopaholic!</em>" },
  { word: "Browse", ipa: "/braʊz/ (v)", meaning: "<strong>Xem hàng (không định mua)</strong>. Nhìn qua các mặt hàng.<br/><em class='text-xs text-gray-500'>Collocation: browse the internet / browse a shop.</em>" },
  { word: "Bargain", ipa: "/ˈbɑːɡən/ (n, v)", meaning: "<strong>Món hời / Mặc cả</strong>. Mua được hàng rẻ hoặc thương lượng giá.<br/><em class='text-xs text-gray-500'>Collocation: get a bargain, bargain with the seller.</em>" },
  { word: "Convenience store", ipa: "/kənˈviːniəns stɔː/ (n)", meaning: "<strong>Cửa hàng tiện lợi</strong>. Cửa hàng mở cửa lâu, bán nhiều loại hàng.<br/><em class='text-xs text-gray-500'>Ví dụ: 7-Eleven, Circle K.</em>" },
  { word: "Online shopping", ipa: "/ˈɒnlaɪn ˈʃɒpɪŋ/ (n)", meaning: "<strong>Mua sắm trực tuyến</strong>. Mua hàng qua internet.<br/><em class='text-xs text-gray-500'>Collocation: shop online.</em>" },
  { word: "Price tag", ipa: "/ˈpraɪs tæɡ/ (n)", meaning: "<strong>Nhãn giá</strong>. Nhãn ghi giá trên hàng hóa.<br/><em class='text-xs text-gray-500'>Ví dụ: check the price tag before buying.</em>" },
  { word: "Home-grown", ipa: "/ˌhəʊm ˈɡrəʊn/ (adj)", meaning: "<strong>Trồng tại nhà / địa phương</strong>. Rau củ quả được trồng ngay tại nhà.<br/><em class='text-xs text-gray-500'>Ví dụ: home-grown vegetables.</em>" },
  { word: "Compare", ipa: "/kəmˈpeə/ (v)", meaning: "<strong>So sánh</strong>. Xem xét điểm giống và khác nhau.<br/><em class='text-xs text-gray-500'>Collocation: compare prices before buying.</em>" },
  { word: "Customer", ipa: "/ˈkʌstəmə/ (n)", meaning: "<strong>Khách hàng</strong>. Người mua hàng hoặc dịch vụ.<br/><em class='text-xs text-gray-500'>Collocation: serve customers.</em>" },
  { word: "Discount", ipa: "/ˈdɪskaʊnt/ (n)", meaning: "<strong>Giảm giá</strong>. Sự giảm giá so với giá gốc.<br/><em class='text-xs text-gray-500'>Collocation: get a discount, 20% discount.</em>" },
  { word: "Retail", ipa: "/ˈriːteɪl/ (n, adj)", meaning: "<strong>Bán lẻ</strong>. Bán hàng trực tiếp cho người tiêu dùng.<br/><em class='text-xs text-gray-500'>Collocation: retail shop, retail price.</em>" },
  { word: "Addict / Addicted", ipa: "/ˈædɪkt/ /əˈdɪktɪd/ (n/adj)", meaning: "<strong>Người nghiện / Nghiện</strong>. Phụ thuộc vào điều gì đó.<br/><em class='text-xs text-gray-500'>Collocation: be addicted to shopping.</em>" },
];

const unit8Exercises: ExerciseItem[] = [
  { id: 1, question: "The supermarket _______ (open) at 8:00 a.m. every day.<br/>(Chia động từ - lịch trình cố định)", answer: "<strong>opens</strong>.<br/>💡 Hiện tại đơn diễn đạt lịch trình/thời gian biểu cố định: The supermarket opens...<br/>⚠️ Không dùng will vì đây là lịch trình đã định sẵn." },
  { id: 2, question: "The concert _______ (start) at 7 p.m. next Saturday.<br/>(Chia động từ - lịch trình tương lai)", answer: "<strong>starts</strong>.<br/>💡 Hiện tại đơn cho sự kiện định sẵn trong tương lai (theo lịch).<br/>Công thức: S + Vs/es (dù là tương lai, nếu theo lịch trình)." },
  { id: 3, question: "She _______ (always / go) to the market on Sunday mornings.<br/>(Trạng từ tần suất)", answer: "<strong>always goes</strong>.<br/>💡 Trạng từ tần suất (always) đứng TRƯỚC động từ thường: She always goes..." },
  { id: 4, question: "He _______ (never) _______ (forget) to check the price tag.<br/>(Trạng từ tần suất)", answer: "<strong>never forgets</strong>.<br/>💡 never đứng trước động từ thường: He never forgets..." },
];

// ============================================================
// UNIT 9: NATURAL DISASTERS (Thảm họa thiên nhiên)
// ============================================================

const unit9Vocab: VocabItem[] = [
  { word: "Natural disaster", ipa: "/ˈnætʃrəl dɪˈzɑːstə/ (n)", meaning: "<strong>Thảm họa thiên nhiên</strong>. Sự kiện thiên nhiên gây thiệt hại lớn.<br/><em class='text-xs text-gray-500'>Ví dụ: earthquakes, floods, tsunamis.</em>" },
  { word: "Earthquake", ipa: "/ˈɜːθkweɪk/ (n)", meaning: "<strong>Động đất</strong>. Rung chuyển của mặt đất do hoạt động địa chất.<br/><em class='text-xs text-gray-500'>Collocation: a 7.0 magnitude earthquake.</em>" },
  { word: "Flood", ipa: "/flʌd/ (n, v)", meaning: "<strong>Lũ lụt / Ngập lụt</strong>. Nước tràn vào khu vực không bình thường.<br/><em class='text-xs text-gray-500'>Collocation: a major flood, floods occur.</em>" },
  { word: "Tsunami", ipa: "/tsuːˈnɑːmi/ (n)", meaning: "<strong>Sóng thần</strong>. Sóng biển khổng lồ do động đất dưới biển.<br/><em class='text-xs text-gray-500'>Ví dụ: the 2004 Indian Ocean tsunami.</em>" },
  { word: "Landslide", ipa: "/ˈlændslaɪd/ (n)", meaning: "<strong>Sạt lở đất</strong>. Đất đá trượt xuống dốc do mưa lớn.<br/><em class='text-xs text-gray-500'>Collocation: landslide risk after heavy rain.</em>" },
  { word: "Tornado", ipa: "/tɔːˈneɪdəʊ/ (n)", meaning: "<strong>Lốc xoáy</strong>. Cơn gió xoáy mạnh hình phễu.<br/><em class='text-xs text-gray-500'>Ví dụ: tornadoes in the USA (Tornado Alley).</em>" },
  { word: "Volcanic eruption", ipa: "/vɒlˈkænɪk ɪˈrʌpʃn/ (n)", meaning: "<strong>Núi lửa phun trào</strong>. Núi lửa phun dung nham và tro bụi.<br/><em class='text-xs text-gray-500'>Ví dụ: the eruption of Mount Vesuvius.</em>" },
  { word: "Shelter", ipa: "/ˈʃeltə/ (n)", meaning: "<strong>Nơi trú ẩn</strong>. Nơi tránh nguy hiểm trong thảm họa.<br/><em class='text-xs text-gray-500'>Collocation: go to a public shelter.</em>" },
  { word: "Evacuate", ipa: "/ɪˈvækjueɪt/ (v)", meaning: "<strong>Sơ tán</strong>. Rời khỏi khu vực nguy hiểm khẩn cấp.<br/><em class='text-xs text-gray-500'>Collocation: evacuate the area.</em>" },
  { word: "Victim", ipa: "/ˈvɪktɪm/ (n)", meaning: "<strong>Nạn nhân</strong>. Người chịu thiệt hại do thảm họa.<br/><em class='text-xs text-gray-500'>Collocation: disaster victims.</em>" },
  { word: "Storm surge", ipa: "/stɔːm sɜːdʒ/ (n)", meaning: "<strong>Nước dâng do bão</strong>. Mực nước biển dâng cao bất thường.<br/><em class='text-xs text-gray-500'>Collocation: storm surge warning.</em>" },
  { word: "Rescue", ipa: "/ˈreskjuː/ (v, n)", meaning: "<strong>Cứu hộ / Giải cứu</strong>. Cứu người khỏi nguy hiểm.<br/><em class='text-xs text-gray-500'>Collocation: rescue team, rescue operation.</em>" },
];

const unit9Exercises: ExerciseItem[] = [
  { id: 1, question: "_______ they arrive, we'll have lunch together.<br/>(As soon as / Before / While / Until)", answer: "<strong>As soon as</strong>.<br/>💡 As soon as = ngay khi → mệnh đề thời gian + hiện tại đơn (not future).<br/>Công thức: As soon as + S + V (HTĐ), S + will + V." },
  { id: 2, question: "_______ I was watching the news, the earthquake struck.<br/>(Chọn từ phù hợp)", answer: "<strong>While</strong>.<br/>💡 While: hành động đang xảy ra (quá khứ tiếp diễn) khi sự kiện khác xảy ra.<br/>While + was/were + V-ing, QKĐ." },
  { id: 3, question: "_______ the storm is over, do not clean up outside.<br/>(Hoàn thành câu)", answer: "<strong>Until / Before</strong>.<br/>💡 Until = cho đến khi. Before = trước khi. Dùng HTĐ sau until/before." },
  { id: 4, question: "The rescue team arrived _______ the flood receded.<br/>(before / after / as soon as)", answer: "<strong>before</strong>.<br/>💡 The rescue team arrived before the flood receded = Đội cứu hộ đến trước khi lũ rút." },
];

const review3Exercises: ExerciseItem[] = [
  { id: 1, question: "Many _______ are in danger because of pollution.<br/>A. ecosystems &nbsp; B. advertisements &nbsp; C. customers &nbsp; D. tornadoes", answer: "<strong>A. ecosystems</strong>.<br/>💡 ecosystems = hệ sinh thái – bị đe dọa bởi ô nhiễm (Unit 7)." },
  { id: 2, question: "The train _______ at 6:00 a.m. tomorrow.<br/>A. leave &nbsp; B. leaves &nbsp; C. will leave &nbsp; D. is leaving", answer: "<strong>B. leaves</strong>.<br/>💡 HTĐ diễn đạt lịch trình cố định: The train leaves at 6 a.m. (Unit 8)." },
  { id: 3, question: "_______ they arrive, call me immediately.<br/>A. Until &nbsp; B. While &nbsp; C. As soon as &nbsp; D. Before", answer: "<strong>C. As soon as</strong>.<br/>💡 As soon as = ngay khi → dùng trong mệnh đề thời gian (Unit 9)." },
  { id: 4, question: "While I _______ (cook), the gas ran out.", answer: "<strong>was cooking</strong>.<br/>💡 While + quá khứ tiếp diễn (was/were + V-ing) + sự kiện xen vào." },
  { id: 5, question: "She _______ buys local products. She thinks they're fresher.<br/>A. always &nbsp; B. is always &nbsp; C. always is &nbsp; D. does always", answer: "<strong>A. always</strong>.<br/>💡 always đứng TRƯỚC động từ thường: She always buys..." },
  { id: 6, question: "What should you do when a landslide warning is announced in your area?", answer: "<strong>Gợi ý: Follow authorities' instructions, go to a shelter, stay away from the slide area.</strong><br/>💡 Ôn Unit 9: Safety during natural disasters." },
];

// ============================================================
// UNIT 10: COMMUNICATION IN THE FUTURE (Giao tiếp trong tương lai)
// ============================================================

const unit10Vocab: VocabItem[] = [
  { word: "Telepathy", ipa: "/təˈlepəθi/ (n)", meaning: "<strong>Thần giao cách cảm</strong>. Khả năng giao tiếp bằng suy nghĩ.<br/><em class='text-xs text-gray-500'>Ví dụ: communicate by telepathy.</em>" },
  { word: "Holography", ipa: "/həˈlɒɡrəfi/ (n)", meaning: "<strong>Hình ảnh ảo 3D</strong>. Kỹ thuật tạo ảnh không không gian 3 chiều.<br/><em class='text-xs text-gray-500'>Ví dụ: 3D holography technology.</em>" },
  { word: "Advanced", ipa: "/ədˈvɑːnst/ (adj)", meaning: "<strong>Tiên tiến, cao cấp</strong>. Hiện đại hơn mức bình thường.<br/><em class='text-xs text-gray-500'>Collocation: advanced technology.</em>" },
  { word: "Communicate", ipa: "/kəˈmjuːnɪkeɪt/ (v)", meaning: "<strong>Giao tiếp, liên lạc</strong>. Trao đổi thông tin với nhau.<br/><em class='text-xs text-gray-500'>Family: communication (n), communicative (adj).</em>" },
  { word: "Social network", ipa: "/ˌsəʊʃl ˈnetwɜːk/ (n)", meaning: "<strong>Mạng xã hội</strong>. Nền tảng giao tiếp trực tuyến.<br/><em class='text-xs text-gray-500'>Ví dụ: Facebook, TikTok.</em>" },
  { word: "Chatbot", ipa: "/ˈtʃætbɒt/ (n)", meaning: "<strong>Hệ thống máy tính trả lời tự động</strong>. Chương trình máy tính tự động trò chuyện.<br/><em class='text-xs text-gray-500'>Ví dụ: AI chatbot.</em>" },
  { word: "Face-to-face", ipa: "/ˌfeɪs tə ˈfeɪs/ (adj, adv)", meaning: "<strong>Trực tiếp, mặt đối mặt</strong>. Nói chuyện trực tiếp với nhau.<br/><em class='text-xs text-gray-500'>Collocation: a face-to-face meeting.</em>" },
  { word: "Translation machine", ipa: "/trænsˈleɪʃn məˌʃiːn/ (n)", meaning: "<strong>Máy phiên dịch</strong>. Thiết bị dịch ngôn ngữ.<br/><em class='text-xs text-gray-500'>Ví dụ: use a translation machine.</em>" },
  { word: "Smartphone", ipa: "/ˈsmɑːtfəʊn/ (n)", meaning: "<strong>Điện thoại thông minh</strong>. Điện thoại di động hiện đại.<br/><em class='text-xs text-gray-500'>Ví dụ: a new smartphone.</em>" },
  { word: "Text message", ipa: "/tekst ˈmesɪdʒ/ (n)", meaning: "<strong>Tin nhắn văn bản</strong>. Tin nhắn chữ gửi qua điện thoại.<br/><em class='text-xs text-gray-500'>Collocation: send a text message.</em>" },
];

const unit10Exercises: ExerciseItem[] = [
  { id: 1, question: "This is not my book. _______ is in my bag.<br/>(Đại từ sở hữu)", answer: "<strong>Mine</strong>.<br/>💡 Đại từ sở hữu thay thế cho tính từ sở hữu + danh từ (my book).<br/>Mine = my book." },
  { id: 2, question: "Is this pen _______? (your/yours)<br/>(Đại từ sở hữu)", answer: "<strong>yours</strong>.<br/>💡 Đứng cuối câu không có danh từ theo sau → dùng đại từ sở hữu yours (của bạn)." },
  { id: 3, question: "They will have a meeting _______ Monday morning.<br/>(Giới từ chỉ thời gian)", answer: "<strong>on</strong>.<br/>💡 Giới từ 'on' dùng trước: ngày trong tuần (Monday), hoặc buổi của một ngày cụ thể (Monday morning)." },
  { id: 4, question: "We usually play sports _______ the weekend.<br/>(Giới từ chỉ thời gian)", answer: "<strong>at/on</strong>.<br/>💡 Giới từ 'at the weekend' (Anh-Anh) hoặc 'on the weekend' (Anh-Mỹ) đều được chấp nhận." },
];

// ============================================================
// UNIT 11: SCIENCE AND TECHNOLOGY (Khoa học và công nghệ)
// ============================================================

const unit11Vocab: VocabItem[] = [
  { word: "Science", ipa: "/ˈsaɪəns/ (n)", meaning: "<strong>Khoa học</strong>. Hoạt động tìm hiểu thế giới.<br/><em class='text-xs text-gray-500'>Family: scientist (n), scientific (adj).</em>" },
  { word: "Technology", ipa: "/tekˈnɒlədʒi/ (n)", meaning: "<strong>Công nghệ</strong>. Ứng dụng khoa học vào đời sống.<br/><em class='text-xs text-gray-500'>Family: technological (adj).</em>" },
  { word: "Invention", ipa: "/ɪnˈvenʃn/ (n)", meaning: "<strong>Phát minh</strong>. Tạo ra thứ chưa từng có.<br/><em class='text-xs text-gray-500'>Family: invent (v), inventor (n).</em>" },
  { word: "Discover", ipa: "/dɪˈskʌvə/ (v)", meaning: "<strong>Khám phá</strong>. Tìm ra thứ đã có sẵn nhưng chưa ai biết.<br/><em class='text-xs text-gray-500'>Family: discovery (n).</em>" },
  { word: "Online learning", ipa: "/ˈɒnlaɪn ˈlɜːnɪŋ/ (n)", meaning: "<strong>Học trực tuyến</strong>. Học qua mạng internet.<br/><em class='text-xs text-gray-500'>Collocation: an online learning platform.</em>" },
  { word: "Robot", ipa: "/ˈrəʊbɒt/ (n)", meaning: "<strong>Người máy</strong>. Máy móc tự động hóa.<br/><em class='text-xs text-gray-500'>Ví dụ: robot teacher.</em>" },
  { word: "Submarine", ipa: "/ˌsʌbməˈriːn/ (n)", meaning: "<strong>Tàu ngầm</strong>. Tàu hoạt động dưới mặt nước.<br/><em class='text-xs text-gray-500'>Ví dụ: nuclear submarine.</em>" },
  { word: "Machine", ipa: "/məˈʃiːn/ (n)", meaning: "<strong>Máy móc</strong>. Thiết bị cơ điện phục vụ công việc.<br/><em class='text-xs text-gray-500'>Ví dụ: washing machine.</em>" },
  { word: "Equip", ipa: "/ɪˈkwɪp/ (v)", meaning: "<strong>Trang bị</strong>. Cung cấp thiết bị cần thiết.<br/><em class='text-xs text-gray-500'>Family: equipment (n).</em>" },
  { word: "Internet", ipa: "/ˈɪntənet/ (n)", meaning: "<strong>Mạng lưới thông tin toàn cầu</strong>.<br/><em class='text-xs text-gray-500'>Collocation: surf the Internet.</em>" },
];

const unit11Exercises: ExerciseItem[] = [
  { id: 1, question: "\"I will invent a new robot,\" Nam said.<br/>(Viết lại câu tường thuật)", answer: "<strong>Nam said (that) he would invent a new robot.</strong><br/>💡 Lùi thì (will → would), đổi đại từ (I → he)." },
  { id: 2, question: "\"We are learning online now,\" they said.<br/>(Viết lại câu tường thuật)", answer: "<strong>They said (that) they were learning online then.</strong><br/>💡 Lùi thì (are → were), đổi đại từ (We → they), đổi trạng từ (now → then)." },
  { id: 3, question: "\"My father bought this tablet yesterday,\" she told me.<br/>(Viết lại câu tường thuật)", answer: "<strong>She told me (that) her father had bought that tablet the previous day / the day before.</strong><br/>💡 Lùi thì QKĐ → QK Hoàn thành (bought → had bought)." },
  { id: 4, question: "\"I like studying science,\" He said.<br/>(Viết lại câu tường thuật)", answer: "<strong>He said (that) he liked studying science.</strong><br/>💡 Lùi thì HTĐ → QKĐ (like → liked), đổi đại từ (I → he)." },
];

// ============================================================
// UNIT 12: LIFE ON OTHER PLANETS (Cuộc sống trên các hành tinh)
// ============================================================

const unit12Vocab: VocabItem[] = [
  { word: "Planet", ipa: "/ˈplænɪt/ (n)", meaning: "<strong>Hành tinh</strong>. Thiên thể quay quanh ngôi sao.<br/><em class='text-xs text-gray-500'>Ví dụ: Earth is a planet.</em>" },
  { word: "Alien", ipa: "/ˈeɪliən/ (n)", meaning: "<strong>Người ngoài hành tinh</strong>. Sinh vật từ thế giới khác.<br/><em class='text-xs text-gray-500'>Ví dụ: do aliens exist?</em>" },
  { word: "Spaceship", ipa: "/ˈspeɪsʃɪp/ (n)", meaning: "<strong>Tàu vũ trụ</strong>. Phương tiện bay trong không gian.<br/><em class='text-xs text-gray-500'>Đồng nghĩa: spacecraft.</em>" },
  { word: "Galaxy", ipa: "/ˈɡæləksi/ (n)", meaning: "<strong>Thiên hà</strong>. Hệ thống hàng tỉ ngôi sao.<br/><em class='text-xs text-gray-500'>Ví dụ: the Milky Way galaxy.</em>" },
  { word: "Solar system", ipa: "/ˈsəʊlə ˌsɪstəm/ (n)", meaning: "<strong>Hệ mặt trời</strong>. Mặt Trời và các hành tinh xung quanh.<br/><em class='text-xs text-gray-500'>Ví dụ: planets in our solar system.</em>" },
  { word: "Telescope", ipa: "/ˈtelɪskəʊp/ (n)", meaning: "<strong>Kính thiên văn</strong>. Quan sát vật ở xa.<br/><em class='text-xs text-gray-500'>Ví dụ: look through a telescope.</em>" },
  { word: "Atmosphere", ipa: "/ˈætməsfɪə/ (n)", meaning: "<strong>Bầu khí quyển</strong>. Lớp khí bao quanh hành tinh.<br/><em class='text-xs text-gray-500'>Ví dụ: Earth's atmosphere.</em>" },
  { word: "Gravity", ipa: "/ˈɡrævəti/ (n)", meaning: "<strong>Trọng lực</strong>. Lực hút của Trái Đất hoặc hành tinh.<br/><em class='text-xs text-gray-500'>Collocation: zero gravity (không trọng lực).</em>" },
  { word: "Astronaut", ipa: "/ˈæstrənɔːt/ (n)", meaning: "<strong>Phi hành gia</strong>. Người bay vào vũ trụ.<br/><em class='text-xs text-gray-500'>Ví dụ: a famous astronaut.</em>" },
  { word: "Habitable", ipa: "/ˈhæbɪtəbl/ (adj)", meaning: "<strong>Có thể sinh sống được</strong>.<br/><em class='text-xs text-gray-500'>Ví dụ: a habitable planet.</em>" },
];

const unit12Exercises: ExerciseItem[] = [
  { id: 1, question: "\"Do you want to travel to Mars?\" she asked me.<br/>(Câu hỏi gián tiếp Yes/No)", answer: "<strong>She asked me if/whether I wanted to travel to Mars.</strong><br/>💡 Mượn if/whether, lùi thì (want → wanted), trật tự câu khẳng định." },
  { id: 2, question: "\"Will humans live on other planets?\" he asked.<br/>(Câu hỏi gián tiếp Yes/No)", answer: "<strong>He asked if/whether humans would live on other planets.</strong><br/>💡 Lùi thì will → would. Nhớ dùng trật tự S + V." },
  { id: 3, question: "\"Where is the nearest galaxy?\" the teacher asked.<br/>(Câu hỏi gián tiếp Wh-)", answer: "<strong>The teacher asked where the nearest galaxy was.</strong><br/>💡 Giữ nguyên từ hỏi (where), đổi trật tự từ (S + V - the nearest galaxy was), lùi thì (is → was)." },
  { id: 4, question: "\"What did you see in the sky?\" Lan asked him.<br/>(Câu hỏi gián tiếp Wh-)", answer: "<strong>Lan asked him what he had seen in the sky.</strong><br/>💡 Lùi thì (QKĐ → QK Hoàn thành: had seen), bỏ trợ động từ (did)." },
];

const review4Exercises: ExerciseItem[] = [
  { id: 1, question: "This is not her laptop. _______ is silver.<br/>A. Her &nbsp; B. Hers &nbsp; C. She &nbsp; D. Herself", answer: "<strong>B. Hers</strong>.<br/>💡 Đại từ sở hữu Hers = her laptop." },
  { id: 2, question: "\"I am testing a new robot now,\" the scientist said.<br/>A. The scientist said he was testing a new robot then.<br/>B. The scientist said I am testing a new robot now.", answer: "<strong>A. The scientist said he was testing a new robot then.</strong><br/>💡 Đổi (I → he, am → was, now → then)." },
  { id: 3, question: "He asked me what time the train _______.<br/>A. leaves &nbsp; B. left &nbsp; C. will leave &nbsp; D. is leaving", answer: "<strong>B. left</strong>.<br/>💡 Câu hỏi gián tiếp phải lùi thì: leaves → left." },
  { id: 4, question: "My birthday is _______ the 5th of June.<br/>A. on &nbsp; B. in &nbsp; C. at &nbsp; D. of", answer: "<strong>A. on</strong>.<br/>💡 Giới từ 'on' dùng cho ngày cụ thể." },
  { id: 5, question: "People communicate by _______ rather than using phones.<br/>A. holography &nbsp; B. telepathy &nbsp; C. telescope &nbsp; D. gravity", answer: "<strong>B. telepathy</strong>.<br/>💡 telepathy = giao tiếp bằng trí não." },
  { id: 6, question: "\"Do you like aliens?\" she asked.<br/>She asked me _______ I liked aliens.", answer: "<strong>if / whether</strong>.<br/>💡 Câu hỏi Yes/No chuyển sang gián tiếp thêm if hoặc whether." },
];

// ============================================================
// QUIZ QUESTIONS - 70 CÂU (Unit 10, 11, 12, Review 4)
// ============================================================

export const quizQuestions: QuizQuestion[] = [
  // ===================================================
  // --- UNIT 7: ENVIRONMENTAL PROTECTION ---
  // ===================================================
  // Vocabulary (5 câu)
  { id: 101, question: "Many _______ are in danger because of pollution and habitat loss.", options: ["ecosystems", "advertisements", "customers", "tornadoes"], correct: 0, explanation: "Ecosystems = hệ sinh thái – bị ô nhiễm phá hủy.", unit: 7 },
  { id: 102, question: "We should reduce _______ plastic to protect the environment.", options: ["single-use", "home-grown", "on sale", "renewable"], correct: 0, explanation: "Single-use plastic = nhựa dùng một lần.", unit: 7 },
  { id: 103, question: "The panda is an _______ species that needs protection.", options: ["ecosystem", "endangered", "evacuated", "electronic"], correct: 1, explanation: "Endangered species = loài có nguy cơ tuyệt chủng.", unit: 7 },
  { id: 104, question: "Solar panels produce _______ energy from sunlight.", options: ["single-use", "renewable", "fossil", "deforested"], correct: 1, explanation: "Renewable energy = năng lượng tái tạo (từ mặt trời, gió...).", unit: 7 },
  { id: 105, question: "Cutting down too many trees causes _______, which destroys animal habitats.", options: ["recycling", "pollution", "deforestation", "conservation"], correct: 2, explanation: "Deforestation = nạn phá rừng.", unit: 7 },
  // Grammar - Past Continuous (5 câu)
  { id: 106, question: "While I _______ to school, it started to rain.", options: ["walk", "walked", "was walking", "am walking"], correct: 2, explanation: "While + quá khứ tiếp diễn: was walking (hành động đang xảy ra khi mưa bắt đầu).", unit: 7 },
  { id: 107, question: "When the earthquake struck, they _______ dinner.", options: ["eat", "ate", "eating", "were eating"], correct: 3, explanation: "When + QKĐ (struck), mệnh đề chính: were eating (QK tiếp diễn).", unit: 7 },
  { id: 108, question: "She _______ the TV when she heard a strange noise outside.", options: ["watch", "watches", "was watching", "watched"], correct: 2, explanation: "Hành động đang diễn ra (was watching) bị gián đoạn (heard).", unit: 7 },
  { id: 109, question: "What _______ you _______ when the flood warning came?", options: ["do / do", "did / do", "were / doing", "are / doing"], correct: 2, explanation: "Câu hỏi QK tiếp diễn: Were + S + V-ing when...?", unit: 7 },
  { id: 110, question: "The children _______ in the garden while their parents _______ lunch.", options: ["play / cook", "were playing / were cooking", "played / cooked", "play / were cooking"], correct: 1, explanation: "Hai hành động song song cùng thời điểm quá khứ → cả hai dùng past continuous.", unit: 7 },

  // ===================================================
  // --- UNIT 8: SHOPPING ---
  // ===================================================
  // Vocabulary (5 câu)
  { id: 111, question: "A person who is addicted to shopping is called a _______.", options: ["customer", "shopaholic", "seller", "retailer"], correct: 1, explanation: "Shopaholic = người nghiện mua sắm.", unit: 8 },
  { id: 112, question: "When you look at goods in a shop without intending to buy, you are _______.", options: ["bargaining", "browsing", "trading", "discounting"], correct: 1, explanation: "Browsing = xem hàng không định mua.", unit: 8 },
  { id: 113, question: "If you buy something for less than its usual price, you get a _______.", options: ["scam", "refund", "bargain", "fee"], correct: 2, explanation: "A bargain = món hời, mua được rẻ.", unit: 8 },
  { id: 114, question: "A shop that is often open 24 hours with many kinds of goods is a _______.", options: ["speciality shop", "bargain shop", "convenience store", "dollar store"], correct: 2, explanation: "Convenience store = cửa hàng tiện lợi (như 7-Eleven).", unit: 8 },
  { id: 115, question: "Shopping _______ allows customers to buy goods over the Internet.", options: ["online", "offline", "onsite", "indoor"], correct: 0, explanation: "Shopping online = mua sắm trực tuyến qua internet.", unit: 8 },
  // Grammar - Present Simple for Future / Adverbs of Frequency (5 câu)
  { id: 116, question: "The supermarket _______ at 8:00 a.m. every day. (Present Simple for timetable)", options: ["open", "opens", "will open", "is opening"], correct: 1, explanation: "Hiện tại đơn diễn tả lịch trình cố định: The supermarket opens...", unit: 8 },
  { id: 117, question: "According to the schedule, the fashion show _______ next Saturday at 7 p.m.", options: ["take place", "takes place", "is take place", "taking place"], correct: 1, explanation: "HTĐ cho sự kiện đã xếp lịch: takes place.", unit: 8 },
  { id: 118, question: "My mother _______ shops at the supermarket. She goes there every weekend.", options: ["never", "rarely", "always", "sometimes"], correct: 2, explanation: "She goes there every weekend → always (luôn luôn).", unit: 8 },
  { id: 119, question: "Nam _______ forgets to check the price tag before buying.", options: ["never", "is never", "never is", "does never"], correct: 0, explanation: "Trạng từ tần suất (never) đứng TRƯỚC động từ thường: Nam never forgets.", unit: 8 },
  { id: 120, question: "The last bus _______ until 10:00 p.m.", options: ["don't leave", "doesn't leave", "didn't leave", "not leaving"], correct: 1, explanation: "HTĐ + số ít (the last bus) → doesn't leave.", unit: 8 },

  // ===================================================
  // --- UNIT 9: NATURAL DISASTERS ---
  // ===================================================
  // Vocabulary (5 câu)
  { id: 121, question: "The _______ measured 7.0 on the Richter scale and caused serious damage.", options: ["tornado", "earthquake", "tsunami", "landslide"], correct: 1, explanation: "Earthquake = động đất; đo bằng thang Richter.", unit: 9 },
  { id: 122, question: "A huge _______ hit the coast after the undersea earthquake.", options: ["flood", "volcano", "tsunami", "shelter"], correct: 2, explanation: "Tsunami = sóng thần; gây ra bởi động đất dưới biển.", unit: 9 },
  { id: 123, question: "People should go to a public _______ if they feel unsafe at home during a disaster.", options: ["shelter", "market", "rescue", "victim"], correct: 0, explanation: "Shelter = nơi trú ẩn an toàn trong thảm họa.", unit: 9 },
  { id: 124, question: "A _______ is the mass movement of rocks or earth sliding down a slope.", options: ["flood", "tornado", "landslide", "storm surge"], correct: 2, explanation: "Landslide = sạt lở đất.", unit: 9 },
  { id: 125, question: "Authorities had to _______ thousands of residents before the typhoon arrived.", options: ["shelter", "evacuate", "rescue", "survive"], correct: 1, explanation: "Evacuate = sơ tán người khỏi vùng nguy hiểm.", unit: 9 },
  // Grammar - Adverbial Clauses of Time (5 câu)
  { id: 126, question: "_______ they arrive, we'll have lunch together.", options: ["Until", "While", "As soon as", "Before"], correct: 2, explanation: "As soon as = ngay khi → sau đó hành động ngay lập tức xảy ra.", unit: 9 },
  { id: 127, question: "_______ the storm is over, don't go outside to clean up.", options: ["As soon as", "While", "Until", "After"], correct: 2, explanation: "Until = cho đến khi → Until the storm is over = cho đến khi bão qua.", unit: 9 },
  { id: 128, question: "_______ the flood receded, the rescue team started the clean-up.", options: ["While", "Until", "After", "As soon as"], correct: 2, explanation: "After + sự việc đã xảy ra → sau đó làm việc tiếp theo.", unit: 9 },
  { id: 129, question: "We should prepare an emergency kit _______ a natural disaster strikes.", options: ["after", "before", "while", "until"], correct: 1, explanation: "Before = trước khi → chuẩn bị trước khi thảm họa xảy ra.", unit: 9 },
  { id: 130, question: "_______ you hear a warning about a landslide, follow the instructions of authorities.", options: ["After", "Until", "As soon as", "Before"], correct: 2, explanation: "As soon as you hear... = ngay khi nghe thấy → phản ứng ngay lập tức.", unit: 9 },

  // ===================================================
  // --- REVIEW 3 - Mixed Unit 7, 8, 9 ---
  // ===================================================
  { id: 131, question: "While she _______ for the bus, it started to rain heavily.", options: ["waits", "waited", "was waiting", "is waiting"], correct: 2, explanation: "While + past continuous: was waiting (hành động đang xảy ra).", unit: 98 },
  { id: 132, question: "My father _______ goes to the market. He prefers shopping online.", options: ["always", "usually", "rarely", "never"], correct: 3, explanation: "He prefers shopping online → không đi chợ → never hoặc rarely. Đáp án: rarely (hiếm khi).", unit: 98 },
  { id: 133, question: "_______ the earthquake struck, people ran out of their houses.", options: ["While", "When", "Until", "Before"], correct: 1, explanation: "When + QKĐ (struck): sự kiện xảy ra → phản ứng tức thì.", unit: 98 },
  { id: 134, question: "We should recycle _______ reduce waste and protect the environment.", options: ["so that", "to", "but", "although"], correct: 1, explanation: "Mục đích: recycle to reduce waste = tái chế để giảm rác thải.", unit: 98 },
  { id: 135, question: "The concert _______ at 8 p.m. according to the schedule.", options: ["start", "starts", "will start", "is starting"], correct: 1, explanation: "Lịch trình cố định → HTĐ: starts.", unit: 98 },
  { id: 136, question: "_______ the landslide, people were told to stay away from the area.", options: ["Because of", "Although", "After", "While"], correct: 2, explanation: "After the landslide = sau trận sạt lở đất.", unit: 98 },
  { id: 137, question: "She _______ shopping at discount stores because she likes bargains.", options: ["loves", "is love", "love", "was love"], correct: 0, explanation: "Loves = thích (HTĐ, she + V-s).", unit: 98 },
  { id: 138, question: "_______ the storm warning, many families evacuated to higher ground.", options: ["After receiving", "While receive", "Before receive", "When receiving"], correct: 0, explanation: "After receiving = sau khi nhận được → After + V-ing.", unit: 98 },
  { id: 139, question: "I _______ (listen) to music when the phone rang.", options: ["listen", "listened", "was listening", "am listening"], correct: 2, explanation: "QK tiếp diễn: was listening (đang nghe thì điện thoại reo).", unit: 98 },
  { id: 140, question: "The shop _______ open until midnight on weekends.", options: ["stay", "stays", "staying", "will staying"], correct: 1, explanation: "HTĐ cho lịch mở cửa cố định: The shop stays open.", unit: 98 },
  // --- UNIT 10: COMMUNICATION IN THE FUTURE ---
  { id: 141, question: "They communicate by _______, reading each other's minds.", options: ["telepathy", "holography", "chatbot", "social network"], correct: 0, explanation: "Telepathy = thần giao cách cảm.", unit: 10 },
  { id: 142, question: "Using 3D _______, you can see a virtual person in the room.", options: ["telepathy", "holography", "smartphone", "social network"], correct: 1, explanation: "Holography = hình ảnh ảo không gian 3 chiều.", unit: 10 },
  { id: 143, question: "Many students use a _______ to answer questions automatically online.", options: ["social network", "chatbot", "telepathy", "face-to-face"], correct: 1, explanation: "Chatbot = phần mềm tự động trò chuyện.", unit: 10 },
  { id: 144, question: "He prefers having a _______ meeting instead of online chat.", options: ["face-to-face", "translation", "telepathy", "smartphone"], correct: 0, explanation: "Face-to-face = gặp mặt trực tiếp.", unit: 10 },
  { id: 145, question: "The _______ network allows people to connect on the internet instantly.", options: ["social", "science", "translation", "advanced"], correct: 0, explanation: "Social network = mạng xã hội.", unit: 10 },
  { id: 146, question: "With a _______ machine, you can understand any foreign language.", options: ["telepathy", "translation", "chatbot", "social"], correct: 1, explanation: "Translation machine = máy phiên dịch.", unit: 10 },
  { id: 147, question: "I sent her a text _______ but she hasn't replied yet.", options: ["meeting", "message", "chatbot", "network"], correct: 1, explanation: "Text message = tin nhắn văn bản.", unit: 10 },
  { id: 148, question: "The iPhone is a popular _______ around the world.", options: ["smartphone", "submarine", "spaceship", "telepathy"], correct: 0, explanation: "Smartphone = điện thoại thông minh.", unit: 10 },
  { id: 149, question: "We use _______ technology to predict weather highly accurately.", options: ["advanced", "social", "face-to-face", "text"], correct: 0, explanation: "Advanced technology = công nghệ tiên tiến.", unit: 10 },
  { id: 150, question: "She works _______ a bank in the main city center.", options: ["in", "on", "at", "by"], correct: 2, explanation: "At a bank = làm việc tại ngân hàng (chỉ địa điểm). In/At đều được.", unit: 10 },
  { id: 151, question: "My birthday party is _______ 15th November.", options: ["in", "on", "at", "for"], correct: 1, explanation: "On + ngày tháng cụ thể.", unit: 10 },
  { id: 152, question: "The last train will leave _______ 6:30 p.m tonight.", options: ["on", "at", "in", "by"], correct: 1, explanation: "At + giờ cụ thể (6:30 p.m).", unit: 10 },
  { id: 153, question: "Her family lives _______ Hanoi capital.", options: ["on", "in", "at", "by"], correct: 1, explanation: "In + thành phố/quốc gia (Hanoi).", unit: 10 },
  { id: 154, question: "Our English class starts _______ the morning.", options: ["in", "on", "at", "to"], correct: 0, explanation: "In the morning = vào buổi sáng.", unit: 10 },
  { id: 155, question: "This is my bicycle. Where is _______?", options: ["your", "you", "yours", "yourself"], correct: 2, explanation: "Yours = your bicycle (đại từ sở hữu).", unit: 10 },
  { id: 156, question: "That huge house belongs to them. It's _______.", options: ["their", "theirs", "they", "them"], correct: 1, explanation: "Theirs = của họ (đại từ sở hữu thay thế their house).", unit: 10 },
  { id: 157, question: "I forgot my black pen. Can I borrow _______?", options: ["yours", "your", "my", "mine"], correct: 0, explanation: "Yours = your pen.", unit: 10 },
  { id: 158, question: "She has her ticket, but Tom lost _______.", options: ["he", "him", "his", "himself"], correct: 2, explanation: "His = his ticket (đại từ sở hữu của he).", unit: 10 },
  { id: 159, question: "Our school is beautiful, but _______ is bigger.", options: ["their", "theirs", "them", "they"], correct: 1, explanation: "Theirs = their school.", unit: 10 },
  { id: 160, question: "Are those keys _______?", options: ["your", "yours", "you", "yourself"], correct: 1, explanation: "Yours = keys của bạn.", unit: 10 },
  // --- UNIT 11: SCIENCE & TECHNOLOGY ---
  { id: 161, question: "The telephone is a great _______ by Alexander G. Bell.", options: ["science", "invention", "robot", "machine"], correct: 1, explanation: "Invention = phát minh.", unit: 11 },
  { id: 162, question: "Many schools are using _______ learning platforms now.", options: ["online", "machine", "science", "spaceship"], correct: 0, explanation: "Online learning = học trực tuyến.", unit: 11 },
  { id: 163, question: "A modern _______ can do housework easily.", options: ["submarine", "technology", "robot", "science"], correct: 2, explanation: "Robot = người máy tự động.", unit: 11 },
  { id: 164, question: "My dad drives a car using the latest AI _______.", options: ["science", "technology", "submarine", "invention"], correct: 1, explanation: "Technology = công nghệ.", unit: 11 },
  { id: 165, question: "They built a nuclear _______ to dive deep underwater.", options: ["submarine", "Internet", "machine", "science"], correct: 0, explanation: "Submarine = tàu ngầm.", unit: 11 },
  { id: 166, question: "Who _______ America first? - Columbus.", options: ["invented", "discovered", "equipped", "texted"], correct: 1, explanation: "Discover = khám phá (tìm ra thứ đã có sẵn).", unit: 11 },
  { id: 167, question: "You can find unlimited information instantly on the _______.", options: ["Internet", "robot", "machine", "science"], correct: 0, explanation: "Internet: mạng toàn cầu.", unit: 11 },
  { id: 168, question: "This washing _______ is completely broken.", options: ["technology", "Internet", "machine", "science"], correct: 2, explanation: "Washing machine = máy giặt.", unit: 11 },
  { id: 169, question: "They _______ the new lab with computers.", options: ["equipped", "invented", "discovered", "launched"], correct: 0, explanation: "Equipped = trang bị thiết bị.", unit: 11 },
  { id: 170, question: "Mathematics and Physics are important _______ subjects.", options: ["invention", "technology", "science", "machine"], correct: 2, explanation: "Science = môn khoa học.", unit: 11 },
  { id: 171, question: "He said that he _______ a new device then.", options: ["is testing", "was testing", "will test", "test"], correct: 1, explanation: "Lùi thì: is testing → was testing (hiện tại tiếp diễn → quá khứ tiếp diễn).", unit: 11 },
  { id: 172, question: "She told me she _______ like biology.", options: ["didn't", "don't", "doesn't", "won't"], correct: 0, explanation: "Lùi thì: don't/doesn't → didn't.", unit: 11 },
  { id: 173, question: "They said they _______ buy a new machine the following day.", options: ["will", "can", "would", "must"], correct: 2, explanation: "Lùi thì: will → would.", unit: 11 },
  { id: 174, question: "Nam said: \"I have finished my science project.\"", options: ["Nam said he had finished his science project.", "Nam said he has finished his science project.", "Nam said I had finished my science project.", "Nam said he finished my science project."], correct: 0, explanation: "Lùi thì: have finished → had finished, I → he.", unit: 11 },
  { id: 175, question: "Mai said she visited the science museum _______.", options: ["yesterday", "tomorrow", "the day before", "next day"], correct: 2, explanation: "yesterday chuyển thành the day before hoặc the previous day.", unit: 11 },
  { id: 176, question: "Lan told us that she _______ to be an inventor.", options: ["want", "wants", "wanted", "wanting"], correct: 2, explanation: "Lùi thì: want → wanted.", unit: 11 },
  { id: 177, question: "\"We are studying robotics now,\" the students said.", options: ["The students said they are studying robotics now.", "The students said they were studying robotics then.", "The students said they studied robotics then.", "The students said we were studying robotics then."], correct: 1, explanation: "are studying → were studying, now → then, we → they.", unit: 11 },
  { id: 178, question: "He said that he could speak English _______.", options: ["here", "now", "there", "today"], correct: 2, explanation: "here chuyển thành there trong câu gián tiếp.", unit: 11 },
  { id: 179, question: "She said, \"I will buy this robot.\"", options: ["She said she would buy that robot.", "She said she will buy that robot.", "She said she would buy this robot.", "She said I would buy that robot."], correct: 0, explanation: "will → would, this → that, I → she.", unit: 11 },
  { id: 180, question: "John told me he _______ that submarine the previous year.", options: ["saw", "sees", "has seen", "had seen"], correct: 3, explanation: "QKĐ lùi 1 thì về QK Hoàn thành (had + V3/ed).", unit: 11 },
  // --- UNIT 12: LIFE ON OTHER PLANETS ---
  { id: 181, question: "Earth is the only _______ known to support life.", options: ["spaceship", "planet", "galaxy", "telescope"], correct: 1, explanation: "Planet = hành tinh.", unit: 12 },
  { id: 182, question: "Do you believe that an _______ could visit Earth?", options: ["alien", "gravity", "telescope", "orbit"], correct: 0, explanation: "Alien = người ngoài hành tinh.", unit: 12 },
  { id: 183, question: "The astronaut travelled in a modern _______.", options: ["telescope", "spaceship", "galaxy", "atmosphere"], correct: 1, explanation: "Spaceship = tàu vũ trụ.", unit: 12 },
  { id: 184, question: "The Milky Way is our _______.", options: ["planet", "spaceship", "galaxy", "gravity"], correct: 2, explanation: "Galaxy = thiên hà.", unit: 12 },
  { id: 185, question: "Our solar _______ consists of the Sun and eight planets.", options: ["system", "machine", "robot", "network"], correct: 0, explanation: "Solar system = hệ mặt trời.", unit: 12 },
  { id: 186, question: "Scientists use a large _______ to see far away stars.", options: ["smartphone", "telescope", "submarine", "machine"], correct: 1, explanation: "Telescope = kính thiên văn.", unit: 12 },
  { id: 187, question: "The Earth's _______ contains 21% oxygen.", options: ["gravity", "atmosphere", "orbit", "galaxy"], correct: 1, explanation: "Atmosphere = bầu khí quyển.", unit: 12 },
  { id: 188, question: "Without _______, we would float away into space.", options: ["oxygen", "telescope", "gravity", "alien"], correct: 2, explanation: "Gravity = trọng lực, sức hút.", unit: 12 },
  { id: 189, question: "Neil Armstrong was a famous American _______.", options: ["alien", "astronaut", "spaceship", "planet"], correct: 1, explanation: "Astronaut = phi hành gia.", unit: 12 },
  { id: 190, question: "Scientists are looking for a _______ planet like Earth.", options: ["habitable", "impossible", "advanced", "social"], correct: 0, explanation: "Habitable = có thể sinh sống được.", unit: 12 },
  { id: 191, question: "She asked me _______ I liked exploring the universe.", options: ["that", "whether", "when", "which"], correct: 1, explanation: "Câu hỏi Yes/No gián tiếp dùng if hoặc whether.", unit: 12 },
  { id: 192, question: "The teacher asked us where Jupiter _______.", options: ["is", "was", "been", "were"], correct: 1, explanation: "Câu hỏi gián tiếp có từ hỏi (where): S + V (lùi thì is → was). Trật tự S + V.", unit: 12 },
  { id: 193, question: "He asked me _______ I had ever seen a UFO.", options: ["if", "what", "where", "how"], correct: 0, explanation: "Câu hỏi Yes/No dùng if (nếu/xem có phải không).", unit: 12 },
  { id: 194, question: "Mai asked Peter what he _______ then.", options: ["is doing", "was doing", "does", "did"], correct: 1, explanation: "Trật tự câu hỏi gián tiếp: S + V lùi thì (was doing). then = now.", unit: 12 },
  { id: 195, question: "He asked his mom when the train _______.", options: ["leave", "leaves", "will leave", "would leave"], correct: 3, explanation: "Lùi thì will leave → would leave.", unit: 12 },
  { id: 196, question: "\"Do aliens exist?\" he asked. = He asked _______.", options: ["if aliens do exist", "whether aliens existed", "if aliens exist", "whether did aliens exist"], correct: 1, explanation: "Bỏ mượn trợ động từ do, lùi thì (exist → existed), dùng whether/if.", unit: 12 },
  { id: 197, question: "I asked Tom how many planets _______ in the solar system.", options: ["there are", "there were", "are there", "were there"], correct: 1, explanation: "Trật tự S + V (there were), không đảo ngữ như were there.", unit: 12 },
  { id: 198, question: "\"Why do you want to be an astronaut?\" she asked me.", options: ["She asked me why I wanted to be an astronaut.", "She asked me why did I want to be an astronaut.", "She asked me why I want to be an astronaut.", "She asked me why do I want to be an astronaut."], correct: 0, explanation: "S + V (I wanted), bỏ trợ động từ do.", unit: 12 },
  { id: 199, question: "They asked us _______ we would build a spaceship.", options: ["that", "whether", "when", "which"], correct: 1, explanation: "Câu hỏi Yes/No → whether/if. Or could be When. Whether is safest for general conditional.", unit: 12 },
  { id: 200, question: "He asked me how to use the _______ machine.", options: ["translation", "translate", "translator", "translating"], correct: 0, explanation: "Translation machine = máy dịch.", unit: 12 },
  // --- REVIEW 4 ---
  { id: 201, question: "In 2050, we might use _______ to communicate by thoughts.", options: ["smartphones", "holography", "telepathy", "letters"], correct: 2, explanation: "Telepathy = thần giao cách cảm.", unit: 99 },
  { id: 202, question: "I met him _______ the cinema.", options: ["in", "on", "at", "by"], correct: 2, explanation: "At the cinema (địa điểm cụ thể).", unit: 99 },
  { id: 203, question: "The blue pen is her pen, and the red one is _______.", options: ["my", "mine", "me", "I"], correct: 1, explanation: "Mine = my pen. (Đại từ sở hữu).", unit: 99 },
  { id: 204, question: "He proudly told us that he _______ a new app.", options: ["created", "creates", "had created", "is creating"], correct: 2, explanation: "Lùi thì thì chia QK Hoàn thành cho việc đã xong (created → had created).", unit: 99 },
  { id: 205, question: "A robotic doctor can perform _______ safely.", options: ["machines", "operations", "telepathy", "galaxies"], correct: 1, explanation: "Operations = phẫu thuật.", unit: 99 },
  { id: 206, question: "She asked me if I _______ aliens on Mars.", options: ["believe in", "believed in", "believes in", "believing"], correct: 1, explanation: "Câu hỏi gián tiếp lùi thì (believed).", unit: 99 },
  { id: 207, question: "The astronaut walked in zero _______ environment.", options: ["atmosphere", "spaceship", "gravity", "alien"], correct: 2, explanation: "Zero gravity = Không trọng lực.", unit: 99 },
  { id: 208, question: "They said they _______ visit the science center the next day.", options: ["will", "can", "would", "shall"], correct: 2, explanation: "Lùi thì will → would. The next day = tomorrow.", unit: 99 },
  { id: 209, question: "\"Will robots replace humans?\" he asked.", options: ["He asked that robots would replace humans.", "He asked if robots would replace humans.", "He asked if robots will replace humans.", "He asked if would robots replace humans."], correct: 1, explanation: "Yes/No dùng If, lùi thì will → would, trật tự S + V.", unit: 99 },
  { id: 210, question: "Is this notebook _______ or his?", options: ["your", "yours", "you", "mine"], correct: 1, explanation: "Yours = của bạn.", unit: 99 }
];

// ============================================================
// LESSONS EXPORT
// ============================================================

export const lessons: Lesson[] = [
  // UNIT 7
  {
    id: 20, title: "Unit 7: Từ vựng Bảo vệ Môi trường", unit: 7, icon: Recycle,
    color: "from-green-500 to-lime-500",
    content: (
      <div>
        <div className="bg-green-50 p-6 rounded-2xl mb-8 border border-green-100">
          <h2 className="text-2xl font-bold text-green-800 mb-2">Environmental Protection</h2>
          <p className="text-green-700">Từ vựng về ô nhiễm, hệ sinh thái, tái chế và bảo vệ môi trường.</p>
        </div>
        <VocabTable items={unit7Vocab} colorTheme="bg-gradient-to-r from-green-500 to-lime-500" />
      </div>
    )
  },
  {
    id: 21, title: "Unit 7: Ngữ pháp Quá khứ tiếp diễn", unit: 7, icon: Globe,
    color: "from-lime-500 to-teal-500",
    content: (
      <div>
        <div className="bg-lime-50 border-l-4 border-lime-400 p-4 mb-8">
          <p className="text-lime-800 font-bold">Past Continuous – Thì Quá khứ tiếp diễn</p>
          <p className="text-lime-700 text-sm mt-1">Diễn đạt hành động <strong>đang xảy ra</strong> tại một thời điểm quá khứ.</p>
        </div>
        <GrammarBox
          title="Thì Quá khứ tiếp diễn"
          color="bg-lime-600"
          rule={
            <div className="space-y-2 text-sm">
              <p><strong>Khẳng định:</strong> S + was/were + V-ing</p>
              <p><strong>Phủ định:</strong> S + was/were + not + V-ing</p>
              <p><strong>Câu hỏi:</strong> Was/Were + S + V-ing?</p>
              <p className="mt-2 text-lime-700">• Dùng <em>when</em>: When + QKĐ, S + was/were + V-ing &nbsp;|&nbsp; • Dùng <em>while</em>: While + QK tiếp diễn, QKĐ</p>
            </div>
          }
          examples={[
            { correct: "While I was walking to school, it started to rain.", explain: "While + QK tiếp diễn | QKĐ" },
            { correct: "When the earthquake struck, they were eating dinner.", explain: "When + QKĐ | QK tiếp diễn" },
            { correct: "She was watching TV when she heard a strange noise.", incorrect: "She watched TV when she heard a noise.", explain: "Hành động đang xảy ra → was watching." },
          ]}
        />
        <div className="space-y-4">
          {unit7Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 22, title: "Unit 7: Ngữ âm – Phụ âm đầu ghép /bl/ /cl/", unit: 7, icon: Mic,
    color: "from-teal-500 to-green-600",
    content: (
      <div>
        <h2 className="text-2xl font-bold text-teal-800 mb-6">Consonant Clusters – Phụ âm đầu ghép</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <PhoneticCard pair="/bl/ /cl/" words={["black", "clean", "blue", "club", "clear", "bloom"]} tip="Phát âm cả hai phụ âm liền nhau: /bl/, /cl/. Ví dụ: black /blæk/, clean /kliːn/." />
          <PhoneticCard pair="/st/ /sp/" words={["stall", "spend", "staff", "store", "sport", "spring"]} tip="Phát âm: /st/ như trong 'store', /sp/ như trong 'spend'. Không bỏ âm đầu."/>
        </div>
        <div className="mt-8 bg-teal-50 p-6 rounded-xl border border-teal-100 text-center">
          <p className="font-bold text-teal-900 text-lg mb-3">Phân biệt phát âm</p>
          <div className="flex flex-wrap justify-center gap-6 text-lg font-medium text-teal-700">
            <span>black /blæk/ ↔ clean /kliːn/</span>
            <span>spend /spend/ ↔ store /stɔː/</span>
          </div>
        </div>
      </div>
    )
  },
  // UNIT 8
  {
    id: 23, title: "Unit 8: Từ vựng Mua sắm", unit: 8, icon: ShoppingBag,
    color: "from-amber-500 to-orange-500",
    content: (
      <div>
        <div className="bg-amber-50 p-6 rounded-2xl mb-8 border border-amber-100">
          <h2 className="text-2xl font-bold text-amber-800 mb-2">Shopping</h2>
          <p className="text-amber-700">Từ vựng về mua sắm, cửa hàng, giá cả và hành vi tiêu dùng.</p>
        </div>
        <VocabTable items={unit8Vocab} colorTheme="bg-gradient-to-r from-amber-500 to-orange-500" />
      </div>
    )
  },
  {
    id: 24, title: "Unit 8: Ngữ pháp – HTĐ cho tương lai", unit: 8, icon: FlaskConical,
    color: "from-orange-400 to-red-500",
    content: (
      <div>
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-8">
          <p className="text-orange-800 font-bold">Present Simple for Future – Hiện tại đơn diễn tả tương lai</p>
          <p className="text-orange-700 text-sm mt-1">Dùng khi sự kiện <strong>có lịch cố định</strong> hoặc theo <strong>thời gian biểu</strong>.</p>
        </div>
        <GrammarBox
          title="HTĐ cho lịch trình & Trạng từ tần suất"
          color="bg-orange-500"
          rule={
            <div className="space-y-2 text-sm">
              <p><strong>HTĐ cho lịch trình:</strong> The train leaves at 6 a.m. (không dùng will)</p>
              <p><strong>Trạng từ tần suất:</strong> always &gt; usually &gt; often &gt; sometimes &gt; rarely &gt; never</p>
              <p className="mt-2 text-orange-700">Vị trí: <strong>sau to be</strong> | <strong>trước động từ thường</strong></p>
            </div>
          }
          examples={[
            { correct: "The shop opens at 9 a.m. tomorrow.", explain: "Lịch trình cố định → HTĐ (opens)." },
            { correct: "She always compares prices before buying.", incorrect: "She is always comparing prices.", explain: "Thói quen → HTĐ + trạng từ tần suất." },
            { correct: "The concert starts at 7 p.m. on Saturday.", explain: "Sự kiện theo lịch → starts (không dùng will start)." },
          ]}
        />
        <div className="space-y-4 mt-8">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 mb-4"><ClipboardCheck className="text-orange-500" /> Luyện tập</h3>
          {unit8Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 25, title: "Unit 8: Ngữ âm – Phụ âm đầu ghép /tr/ /gr/", unit: 8, icon: Mic,
    color: "from-red-400 to-rose-500",
    content: (
      <div>
        <h2 className="text-2xl font-bold text-red-800 mb-6">Consonant Clusters – /tr/ /gr/ /pr/ /cr/</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <PhoneticCard pair="/tr/ /gr/" words={["trade", "trend", "grocery", "green", "price", "product"]} tip="Phát âm /tr/ như trong 'trade', /gr/ như trong 'green'. Phát âm cả 2 âm liền nhau." />
          <PhoneticCard pair="/pr/ /cr/" words={["price", "product", "credit", "crown", "problem", "craft"]} tip="/pr/ như trong 'price', /cr/ như trong 'credit'. Đây là nhóm phụ âm hay gặp trong từ vựng mua sắm."/>
        </div>
      </div>
    )
  },
  // UNIT 9
  {
    id: 26, title: "Unit 9: Từ vựng Thảm họa thiên nhiên", unit: 9, icon: CloudLightning,
    color: "from-blue-500 to-cyan-600",
    content: (
      <div>
        <div className="bg-blue-50 p-6 rounded-2xl mb-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Natural Disasters</h2>
          <p className="text-blue-700">Từ vựng về các thảm họa thiên nhiên, cách ứng phó và cứu hộ.</p>
        </div>
        <VocabTable items={unit9Vocab} colorTheme="bg-gradient-to-r from-blue-500 to-cyan-600" />
      </div>
    )
  },
  {
    id: 27, title: "Unit 9: Ngữ pháp – Mệnh đề trạng ngữ thời gian", unit: 9, icon: Rocket,
    color: "from-cyan-500 to-sky-600",
    content: (
      <div>
        <div className="bg-cyan-50 border-l-4 border-cyan-400 p-4 mb-8">
          <p className="text-cyan-800 font-bold">Adverbial Clauses of Time – Mệnh đề trạng ngữ chỉ thời gian</p>
          <p className="text-cyan-700 text-sm mt-1">Các từ nối: <strong>when, while, before, after, as soon as, until</strong></p>
        </div>
        <GrammarBox
          title="Mệnh đề trạng ngữ chỉ thời gian"
          color="bg-cyan-600"
          rule={
            <div className="space-y-2 text-sm">
              <p>• <strong>when</strong>: khi (xảy ra đồng thời hoặc gần nhau)</p>
              <p>• <strong>while</strong>: trong khi (hai hành động song song)</p>
              <p>• <strong>before/after</strong>: trước/sau khi</p>
              <p>• <strong>as soon as</strong>: ngay khi (xảy ra tức thì)</p>
              <p>• <strong>until</strong>: cho đến khi</p>
              <div className="bg-amber-50 p-2 rounded mt-2 border border-amber-200">
                <p className="text-amber-800">⚠️ Mệnh đề thời gian → dùng <strong>HTĐ</strong>, KHÔNG dùng will: <em>As soon as we arrive (not will arrive)</em></p>
              </div>
            </div>
          }
          examples={[
            { correct: "As soon as they arrive, we will have lunch.", explain: "As soon as + HTĐ (arrive) → phản ứng ngay tức thì." },
            { correct: "Before the storm comes, prepare an emergency kit.", explain: "Before + HTĐ → hành động xảy ra trước." },
            { correct: "Until the flood recedes, stay indoors.", incorrect: "Until the flood will recede, stay indoors.", explain: "Mệnh đề thời gian không dùng will." },
          ]}
        />
        <div className="space-y-4 mt-8">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 mb-4"><ClipboardCheck className="text-cyan-600" /> Luyện tập</h3>
          {unit9Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 28, title: "Unit 9: Ngữ âm – Phụ âm cuối /nd/ /nt/", unit: 9, icon: Mic,
    color: "from-sky-400 to-blue-500",
    content: (
      <div>
        <h2 className="text-2xl font-bold text-sky-800 mb-6">Final Consonant Clusters – Phụ âm cuối /nd/ /nt/ /st/</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <PhoneticCard pair="/nd/ /nt/" words={["land", "hand", "bend", "front", "plant", "hunt"]} tip="Phát âm rõ cả hai phụ âm cuối: /nd/ như landslide, /nt/ như plant." />
          <PhoneticCard pair="/st/ /sk/" words={["last", "first", "most", "risk", "desk", "mask"]} tip="/st/ như 'last', /sk/ như 'risk'. Không bỏ âm cuối." />
        </div>
        <div className="mt-8 bg-sky-50 p-6 rounded-xl border border-sky-100">
          <p className="font-bold text-sky-900 mb-3">Từ trong Unit 9 có phụ âm cuối ghép:</p>
          <div className="flex flex-wrap gap-3">
            {['land', 'flood', 'ground', 'front', 'plant', 'send', 'band', 'tent'].map((w, i) => (
              <span key={i} className="px-3 py-1 bg-sky-100 text-sky-800 rounded-full font-medium">{w}</span>
            ))}
          </div>
        </div>
      </div>
    )
  },
  // REVIEW 3
  {
    id: 29, title: "Review 3: Ôn tập tổng hợp", unit: 98, icon: RotateCcw,
    color: "from-violet-500 to-purple-600",
    content: (
      <div>
        <div className="bg-violet-50 p-6 rounded-2xl mb-8 border border-violet-100">
          <h2 className="text-2xl font-bold text-violet-800 mb-2">🔄 Review 3: Tổng hợp Unit 7-9</h2>
          <p className="text-violet-700">Ôn tập tổng hợp từ vựng và ngữ pháp từ cả 3 unit đầu kỳ 2.</p>
        </div>
        <div className="space-y-4">
          {review3Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 30, title: "Review 3: Ngữ pháp tổng hợp", unit: 98, icon: BookMarked,
    color: "from-purple-500 to-violet-600",
    content: (
      <div>
        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-8">
          <p className="text-purple-800 font-bold">Tổng hợp: Past Continuous + Present Simple for Future + Time Clauses</p>
        </div>
        <GrammarBox
          title="1. Quá khứ tiếp diễn (Past Continuous)"
          color="bg-lime-600"
          rule={<p><strong>S + was/were + V-ing</strong>. Hành động đang xảy ra tại một thời điểm quá khứ. Kết hợp: <em>while/when</em>.</p>}
          examples={[{ correct: "While she was shopping, she met an old friend.", explain: "While + QK tiếp diễn." }]}
        />
        <GrammarBox
          title="2. HTĐ diễn tả tương lai theo lịch"
          color="bg-orange-500"
          rule={<p><strong>S + Vs/es</strong>. Dùng cho lịch trình, thời gian biểu cố định. <em>Không dùng will</em> trong trường hợp này.</p>}
          examples={[
            { correct: "The store opens at 9 a.m. tomorrow.", explain: "Lịch mở cửa cố định → HTĐ." },
            { correct: "She often shops online on weekends.", explain: "Thói quen → HTĐ + trạng từ tần suất." },
          ]}
        />
        <GrammarBox
          title="3. Mệnh đề thời gian"
          color="bg-cyan-600"
          rule={<p>Các từ nối: <strong>when, while, before, after, as soon as, until</strong> → mệnh đề thời gian dùng <strong>HTĐ</strong> (không dùng will).</p>}
          examples={[
            { correct: "As soon as the storm stops, we will go outside.", incorrect: "As soon as the storm will stop...", explain: "Mệnh đề thời gian không dùng will." },
          ]}
        />
      </div>
    )
  },
  // UNIT 10
  {
    id: 1001, title: "Unit 10: Từ vựng Communication in the future", unit: 10, icon: MessageCircle,
    color: "from-blue-600 to-indigo-500",
    content: (
      <div>
        <div className="bg-blue-50 p-6 rounded-2xl mb-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Communication in the future</h2>
          <p className="text-blue-700">Từ vựng về giao tiếp trong tương lai, thiết bị thông minh, mạng xã hội và thần giao cách cảm.</p>
        </div>
        <VocabTable items={unit10Vocab} colorTheme="bg-gradient-to-r from-blue-600 to-indigo-500" />
      </div>
    )
  },
  {
    id: 1002, title: "Unit 10: Ngữ pháp Đại từ sở hữu & Giới từ", unit: 10, icon: BookOpenCheck,
    color: "from-indigo-500 to-violet-600",
    content: (
      <div>
        <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-8">
          <p className="text-indigo-800 font-bold">Trọng tâm: Possessive Pronouns & Prepositions of Time and Place</p>
        </div>
        <GrammarBox
          title="1. Đại từ sở hữu (Possessive Pronouns)"
          color="bg-indigo-600"
          rule={
            <div className="space-y-2 text-sm">
              <p>Đại từ sở hữu thay thế cho <strong>Tính từ sở hữu + Danh từ</strong> để tránh lặp lại.</p>
              <p>mine, yours, his, hers, ours, theirs.</p>
              <p className="mt-2 text-indigo-700">⚠️ Không bao giờ thêm danh từ phía sau đại từ sở hữu.</p>
            </div>
          }
          examples={[
            { correct: "This is my pen. Yours is on the table.", explain: "Yours = Your pen." },
            { correct: "Is this book his or hers?", explain: "His = His book, Hers = Her book." },
          ]}
        />
        <GrammarBox
          title="2. Giới từ chỉ Thời gian & Địa điểm"
          color="bg-violet-600"
          rule={
            <div className="space-y-2 text-sm">
              <p>• <strong>in</strong>: tháng, năm, mùa, buổi / thành phố, quốc gia, phòng.</p>
              <p>• <strong>on</strong>: ngày trong tuần, ngày tháng / trên bề mặt.</p>
              <p>• <strong>at</strong>: giờ cụ thể, dịp lễ / địa điểm cụ thể (trường, nhà ga).</p>
            </div>
          }
          examples={[
            { correct: "We start school in September on Monday morning.", explain: "In + tháng, On + thứ." },
            { correct: "I am waiting at the station.", explain: "At + địa điểm cụ thể." },
          ]}
        />
        <div className="space-y-4 mt-8">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 mb-4"><ClipboardCheck className="text-indigo-600" /> Luyện tập</h3>
          {unit10Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 1003, title: "Unit 10: Ngữ âm – Trọng âm đuôi -ese & -ee", unit: 10, icon: Mic,
    color: "from-violet-500 to-purple-500",
    content: (
      <div>
        <h2 className="text-2xl font-bold text-violet-800 mb-6">Trọng âm đuôi -ese & -ee</h2>
        <div className="bg-violet-50 p-4 rounded-xl mb-6 text-violet-800">
          Quy tắc: Những từ kết thúc bằng đuôi <strong>-ese</strong> hoặc <strong>-ee</strong>, trọng âm rơi vào <strong>chính âm tiết đó</strong>.
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <PhoneticCard pair="Đuôi -ese" words={["Vietnam-ESE", "Japan-ESE", "Chin-ESE"]} tip="Nhấn mạnh vào âm cuối -ESE." />
          <PhoneticCard pair="Đuôi -ee" words={["train-EE", "employ-EE", "refer-EE"]} tip="Nhấn mạnh vào âm cuối -EE." />
        </div>
      </div>
    )
  },
  // UNIT 11
  {
    id: 1101, title: "Unit 11: Từ vựng Science and Technology", unit: 11, icon: Cpu,
    color: "from-sky-500 to-blue-600",
    content: (
      <div>
        <div className="bg-sky-50 p-6 rounded-2xl mb-8 border border-sky-100">
          <h2 className="text-2xl font-bold text-sky-800 mb-2">Science & Technology</h2>
          <p className="text-sky-700">Từ vựng về khoa học, công nghệ, thiết bị học trực tuyến, phát minh máy móc.</p>
        </div>
        <VocabTable items={unit11Vocab} colorTheme="bg-gradient-to-r from-sky-500 to-blue-600" />
      </div>
    )
  },
  {
    id: 1102, title: "Unit 11: Ngữ pháp Câu tường thuật (Statements)", unit: 11, icon: FlaskConical,
    color: "from-blue-500 to-indigo-600",
    content: (
      <div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <p className="text-blue-800 font-bold">Reported Speech (Statements) – Câu tường thuật dạng khẳng định</p>
          <p className="text-blue-700 text-sm mt-1">Cấu trúc: <strong>S + said/told (that) + S + V (đã lùi thì)</strong></p>
        </div>
        <GrammarBox
          title="Quy tắc chuyển câu tường thuật"
          color="bg-blue-600"
          rule={
            <div className="space-y-2 text-sm">
              <p><strong>1. Đổi đại từ:</strong> I → he/she, my → his/her, we → they.</p>
              <p><strong>2. Lùi thì:</strong></p>
              <ul className="list-disc ml-5">
                <li>Hiện tại đơn (V1) → Quá khứ đơn (V2/ed)</li>
                <li>HT tiếp diễn (am/is/are V-ing) → QK tiếp diễn (was/were V-ing)</li>
                <li>Quá khứ đơn (V2/ed) → QK Hoàn thành (had + V3/ed)</li>
                <li>HT Hoàn thành (have/has V3) → QK Hoàn thành (had + V3/ed)</li>
                <li>will → would / can → could / must → had to</li>
              </ul>
              <p><strong>3. Đổi trạng từ:</strong> now → then, today → that day, tomorrow → the next day, yesterday → the day before, this → that.</p>
            </div>
          }
          examples={[
            { correct: "\"I like science,\" he said.", explain: "Gián tiếp: He said he liked science." },
            { correct: "\"We will invention a robot tomorrow,\" they said.", explain: "Gián tiếp: They said they would invent a robot the next day." },
          ]}
        />
        <div className="space-y-4 mt-8">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 mb-4"><ClipboardCheck className="text-blue-600" /> Luyện tập</h3>
          {unit11Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  // UNIT 12
  {
    id: 1201, title: "Unit 12: Từ vựng Life on other planets", unit: 12, icon: Stars,
    color: "from-indigo-600 to-purple-700",
    content: (
      <div>
        <div className="bg-indigo-50 p-6 rounded-2xl mb-8 border border-indigo-100">
          <h2 className="text-2xl font-bold text-indigo-800 mb-2">Life on Other Planets</h2>
          <p className="text-indigo-700">Từ vựng về hành tinh, người ngoài hành tinh, tàu vũ trụ và hệ mặt trời.</p>
        </div>
        <VocabTable items={unit12Vocab} colorTheme="bg-gradient-to-r from-indigo-600 to-purple-700" />
      </div>
    )
  },
  {
    id: 1202, title: "Unit 12: Ngữ pháp Câu hỏi gián tiếp (Reported Questions)", unit: 12, icon: Rocket,
    color: "from-purple-500 to-fuchsia-600",
    content: (
      <div>
        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-8">
          <p className="text-purple-800 font-bold">Reported Questions – Câu hỏi gián tiếp</p>
          <p className="text-purple-700 text-sm mt-1">Sử dụng để thuật lại câu hỏi của người khác.</p>
        </div>
        <GrammarBox
          title="1. Câu hỏi Yes/No"
          color="bg-purple-600"
          rule={
            <div className="space-y-2 text-sm">
              <p className="text-lg font-bold">S + asked (me) + if/whether + S + V (lùi thì)</p>
              <div className="bg-amber-50 p-2 rounded mt-2 border border-amber-200">
                <p className="text-amber-800">⚠️ Bỏ các trợ động từ (do/does/did) và sử dụng thì quá khứ. Trật tự cuối là Khẳng Định, KHÔNG đảo ngữ.</p>
              </div>
            </div>
          }
          examples={[
            { correct: "\"Do you like aliens?\" she asked.", explain: "She asked me if I liked aliens." },
            { correct: "\"Will it rain?\" he asked.", explain: "He asked if it would rain." },
          ]}
        />
        <GrammarBox
          title="2. Câu hỏi có từ hỏi Wh-"
          color="bg-fuchsia-600"
          rule={
            <div className="space-y-2 text-sm">
              <p className="text-lg font-bold">S + asked (me) + Wh- + S + V (lùi thì)</p>
              <div className="bg-amber-50 p-2 rounded mt-2 border border-amber-200">
                <p className="text-amber-800">⚠️ Giữ nguyên từ hỏi Wh-, KHÔNG mượn trợ động từ. S đứng trước V lùi thì.</p>
              </div>
            </div>
          }
          examples={[
            { correct: "\"Where do you live?\" they asked.", explain: "They asked where I lived." },
            { correct: "\"What time is it?\" he asked.", explain: "He asked what time it was." },
          ]}
        />
        <div className="space-y-4 mt-8">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 mb-4"><ClipboardCheck className="text-purple-600" /> Luyện tập</h3>
          {unit12Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  // REVIEW 4
  {
    id: 9901, title: "Review 4: Ôn tập tổng hợp", unit: 99, icon: RotateCcw,
    color: "from-rose-500 to-pink-600",
    content: (
      <div>
        <div className="bg-rose-50 p-6 rounded-2xl mb-8 border border-rose-100">
          <h2 className="text-2xl font-bold text-rose-800 mb-2">🔄 Review 4: Tổng hợp Unit 10-12</h2>
          <p className="text-rose-700">Ôn tập trọn bộ đại từ sở hữu, giới từ và hệ thống câu tường thuật.</p>
        </div>
        <div className="space-y-4">
          {review4Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 9902, title: "Review 4: Ngữ pháp tổng hợp", unit: 99, icon: Star,
    color: "from-pink-500 to-rose-600",
    content: (
      <div>
        <div className="bg-pink-50 border-l-4 border-pink-400 p-4 mb-8">
          <p className="text-pink-800 font-bold">Tổng hợp: Possessive Pronouns + Reported Speech</p>
        </div>
        <GrammarBox
          title="1. Đại từ sở hữu & Giới từ"
          color="bg-indigo-600"
          rule={<p><strong>mine, yours, theirs...</strong>. Giới từ IN (tháng, năm), ON (thứ, ngày), AT (giờ).</p>}
          examples={[{ correct: "This laptop is mine.", explain: "Mine = my laptop." }]}
        />
        <GrammarBox
          title="2. Câu tường thuật trần thuật"
          color="bg-blue-600"
          rule={<p><strong>S + said that + S + V(lùi thì)</strong>. Đổi ngôi, lùi thì, đổi trạng từ.</p>}
          examples={[
            { correct: "He said he was studying then.", explain: "Qúa khứ tiếp diễn." },
          ]}
        />
        <GrammarBox
          title="3. Câu hỏi gián tiếp"
          color="bg-purple-600"
          rule={<p><strong>ask + if/whether hoặc từ hỏi Wh- + S + V(lùi thì)</strong>. Không đảo ngữ.</p>}
          examples={[
            { correct: "She asked if I liked robots.", explain: "Yes/No questions." },
            { correct: "He asked where I went.", explain: "Wh- questions." }
          ]}
        />
      </div>
    )
  },
];


