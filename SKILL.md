---
name: Build Web Ôn Tập Cuối Kỳ - Tiếng Anh Global Success
description: Skill hướng dẫn toàn trình xây dựng web ôn tập cuối kỳ Tiếng Anh sách Global Success cho các lớp 7, 8, 9 với React + Vite + TailwindCSS, có quiz trắc nghiệm và từ điển từ vựng tương tác.
---

# SKILL: Build Web Ôn Tập Cuối Kỳ – Tiếng Anh Global Success

## Mục tiêu

Tạo website ôn tập cuối kỳ chuyên nghiệp cho bộ sách **Tiếng Anh Global Success** (Bộ Giáo dục), hỗ trợ học sinh lớp 7/8/9 ôn luyện hiệu quả với:

- 📚 **Card bài học** cho từng Unit (từ vựng, ngữ pháp, ngữ âm)
- 📝 **Quiz trắc nghiệm** có đếm giờ và giải thích đáp án
- 🎨 **Giao diện đẹp** với hiệu ứng gradient, animation, responsive

---

## Cấu trúc Project

```
REVIEW-END-TERM-[LỚP]/
├── index.html          ← Cấu hình global CSS, Tailwind CDN, font
├── index.tsx           ← Entry point React
├── App.tsx             ← Layout chính, hero, tab navigation, footer
├── data.tsx            ← TẤT CẢ nội dung: từ vựng, bài tập, quiz, lessons
├── types.ts            ← TypeScript interfaces
├── components/
│   ├── LessonModal.tsx ← Modal popup xem bài học chi tiết
│   └── QuizSection.tsx ← Component quiz trắc nghiệm đầy đủ
├── package.json
├── vite.config.ts
└── tsconfig.json
```

**Các file cần XÓA khi setup project mới / clone:**
- Thư mục `SKILL EDUCATION/` (skills không liên quan)
- `metadata.json` (metadata không cần thiết)
- `dist/` (build cũ, nên xóa để tránh nhầm)
- Bất kỳ file `.txt`, `.docx`, `.pdf` không phải source code

---

## Stack Công Nghệ

| Công nghệ | Phiên bản | Vai trò |
|-----------|-----------|---------|
| React | 18.x | UI framework |
| TypeScript | 5.x | Type safety |
| Vite | 5.x | Build tool, dev server |
| TailwindCSS | CDN | Styling (dùng CDN trong index.html) |
| framer-motion | 11.x | Animation (modal, transitions) |
| lucide-react | 0.344+ | Icons |

---

## Hướng Dẫn Build Từng Bước

### Bước 1: Clone / Setup Project

```powershell
# Copy từ project lớp 7 đã có sẵn
cp -r "REVIEW-END-TERM 7" "REVIEW-END-TERM 8"
cd "REVIEW-END-TERM 8"

# Xóa file không liên quan
Remove-Item -Recurse -Force "SKILL EDUCATION"
Remove-Item -Force "metadata.json"

# Cài dependencies (nếu node_modules chưa có)
npm install
```

### Bước 2: Cập nhật `index.html`

Chỉ cần sửa thẻ `<title>` và `<meta description>`:

```html
<title>Global Success [LỚP] - Ôn tập Cuối kỳ 2 | Unit [X]→[Y] | Thầy Võ Ngọc Tùng</title>
<meta name="description" content="Web ôn tập Tiếng Anh Cuối kỳ 2 lớp [LỚP] Global Success: Unit [X]-[Y], Review [A]-[B]." />
```

**Gradient hero** – chỉnh màu cho phù hợp lớp:
```css
.hero-gradient-7 {
  /* Lớp 7: Blue→Rose→Amber */
  background: linear-gradient(135deg, #0369a1 0%, #0891b2 25%, #e11d48 55%, #d97706 100%);
}
/* Lớp 8: dùng màu khác, ví dụ: Violet→Cyan */
/* Lớp 9: ví dụ: Emerald→Purple */
```

### Bước 3: Cập nhật `App.tsx`

Thay toàn bộ text "Giữa kỳ"/"Cuối kỳ" và số Unit, icon floating card, unit colors/labels:

```tsx
// Unit colors cho mỗi lớp
const unitColors: Record<number, string> = {
  // Lớp 8: Unit 1-12 (điều chỉnh theo chương trình)
  1: 'bg-blue-100 text-blue-700',
  2: 'bg-rose-100 text-rose-700',
  // ... thêm unit tương ứng
};
```

### Bước 4: Viết nội dung `data.tsx` (QUAN TRỌNG NHẤT)

Đây là file chứa toàn bộ nội dung học thuật. Cấu trúc cho mỗi Unit:

#### 4a. Từ vựng (VocabItem[])

```tsx
const unit1Vocab: VocabItem[] = [
  { 
    word: "Từ tiếng Anh", 
    ipa: "/phiên âm IPA/ (loại từ)",  // n=danh từ, v=động từ, adj=tính từ
    meaning: "<strong>Nghĩa chính</strong>.<br/><em class='text-xs text-gray-500'>Giải thích ngắn dễ hiểu.</em>"
  },
  // Cần 10-12 từ vựng trọng tâm mỗi Unit
];
```

#### 4b. Bài tập (ExerciseItem[])

```tsx
const unit1Exercises: ExerciseItem[] = [
  {
    id: 1,
    question: "Câu hỏi điền từ / chọn đáp án<br/>A. Đáp án 1 &nbsp; B. Đáp án 2 &nbsp; C. Đáp án 3",
    answer: "<strong>B. Đáp án đúng</strong>.<br/>Giải thích lý do bằng tiếng Việt đơn giản."
  },
  // Cần 4 bài tập mỗi Unit (90% cơ bản, 10% nâng cao)
];
```

#### 4c. Quiz (QuizQuestion[]) – 10 câu/Unit

```tsx
{ 
  id: 1, 
  question: "Câu hỏi trắc nghiệm tiếng Anh?", 
  options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"], 
  correct: 0,  // index của đáp án đúng (0=A, 1=B, 2=C, 3=D)
  explanation: "Giải thích bằng tiếng Việt đơn giản.", 
  unit: 7  // số Unit: 7-12 | 98=Review 3 | 99=Review 4
},
```

#### 4d. Lesson cards (Lesson[]) – 3 card/Unit

Mỗi Unit gồm 3 card:
1. **Từ vựng** → dùng `<VocabTable items={unitXVocab} />`
2. **Ngữ pháp** → dùng `<GrammarBox ... />` + `<ExerciseCard />`
3. **Ngữ âm** → dùng `<PhoneticCard pair="..." words={[...]} />`

```tsx
{
  id: 0,  // ID duy nhất, bắt đầu từ 0
  title: "Unit X: Từ vựng [Chủ đề]",
  unit: X,  // Số Unit
  icon: Car,  // Icon từ lucide-react
  color: "from-blue-600 to-cyan-500",  // Gradient màu
  content: (
    <div>
      <VocabTable items={unitXVocab} colorTheme="bg-gradient-to-r from-blue-600 to-cyan-500" />
    </div>
  )
},
```

---

## Nội Dung Theo Lớp

### Lớp 7 - Học kỳ 2 (Unit 7-12)

| Unit | Chủ đề | Ngữ pháp chính | Ngữ âm |
|------|--------|----------------|--------|
| 7 | Traffic (Giao thông) | Should/Shouldn't, It + distance | /aɪ/ vs /eɪ/ |
| 8 | Films (Phim ảnh) | Although vs However | /ɪə/ vs /eə/ |
| 9 | Festivals (Lễ hội) | Yes/No Questions, Word Stress | Word Stress |
| 10 | Sources of Energy | Comparative Adjectives | /st/ /str/ |
| 11 | Travelling in the Future | Future Simple (will) | /sp/ /spl/ |
| 12 | Robots | Can/Can't, Relative Clauses (who/which) | /sk/ /skr/ |

### Lớp 8 - Học kỳ 2 (Unit 7-12) ✅ ĐÃ XÁC NHẬN VỚI SGK

| Unit | Chủ đề | Ngữ pháp chính | Ngữ âm |
|------|--------|----------------|--------|
| 7 | **Environmental Protection** (Bảo vệ môi trường) | Past Continuous (while/when) | Phụ âm đầu ghép /bl/ /cl/ /st/ /sp/ |
| 8 | **Shopping** (Mua sắm) | Present Simple for Future, Adverbs of Frequency | Phụ âm đầu ghép /tr/ /gr/ /pr/ /cr/ |
| 9 | **Natural Disasters** (Thảm họa thiên nhiên) | Adverbial Clauses of Time (when/while/before/after/as soon as/until) | Phụ âm cuối ghép /nd/ /nt/ /st/ /sk/ |
| 10 | **Ecotourism** (Du lịch sinh thái) | Present Perfect (have/has + V3) | /ɪ/ vs /iː/ |
| 11 | **Science & Technology** (Khoa học & Công nghệ) | Passive Voice (be + V3) | Word stress |
| 12 | **Life on Other Planets** (Sống trên hành tinh khác) | Conditional Type 2 (If + past, would + V) | Intonation |
| Review 3 | **Tổng hợp Unit 7-9** | Mixed: Past Continuous + HT Đơn cho lịch trình + Time Clauses | — |
| Review 4 | **Tổng hợp Unit 10-12** | Mixed: Present Perfect + Passive + Conditional Type 2 | — |

### Lớp 9 - Học kỳ 2 (Unit 7-12) ← ĐIỀU CHỈNH THEO CT

> Cần xác nhận lại chương trình Lớp 9 trước khi build

---

## Chạy Development

```powershell
npm run dev
# → http://localhost:5173/
```

## Build Production

```powershell
npm run build
# Output: dist/ folder
```

---

## ⚠️ Lưu ý kỹ thuật khi dùng AI viết data.tsx

> **Vấn đề phát sinh:** `data.tsx` rất dài (vocab + exercises + quiz + lessons cho 6 Unit + 2 Review). Nếu viết một lần, AI sẽ vượt giới hạn token (~16384 tokens) và bị lỗi.

> **⚠️ CẢNH BÁO NGUỒN DỮ LIỆU:** Các file quiz shorttest (ví dụ `quiz-unit7-traffic.html`) có thể là bài kiểm tra **cùng tên Unit nhưng khác lớp**. Luôn kiểm tra dòng `Global Success [LỚP]` trong `<meta description>` hoặc tiêu đề file trước khi dùng. File `quiz-grade8-midterm2.html` (Kiểm tra 15 phút lần 3) mới là nguồn **chính xác cho lớp 8 Unit 7-9 & Review 3**.

### Giải pháp: Chia thành nhiều bước nhỏ

**Bước 4a – Viết file mới** với nội dung đầu tiên (components + Unit đầu tiên):
```
write_to_file → data.tsx (overwrite=true)
Nội dung: imports + components (VocabTable, GrammarBox, ExerciseCard, PhoneticCard)
          + vocab và exercises của Unit đầu tiên
```

**Bước 4b, 4c, ... – Append các Unit tiếp theo** bằng `replace_file_content`:
```
replace_file_content → thay dòng cuối cùng của file
TargetContent: dòng kết thúc cuối file (ví dụ: dòng ];)
ReplacementContent: ]; + nội dung Unit tiếp theo
```

**Bước cuối – Append quizQuestions và lessons export** tương tự.

> **Mẹo:** Sau mỗi bước append, dùng `view_file` để kiểm tra số dòng cuối trước khi append tiếp.

## Deploy lên Vercel

```powershell
# Cần có vercel.json trong project (đã có sẵn)
# Push lên GitHub → kết nối Vercel → auto deploy
git add -A
git commit -m "Build web on tap cuoi ky 2"
git push
```

---

## Nguyên Tắc Nội Dung

1. **90% kiến thức cơ bản, 10% nâng cao**
   - Từ vựng: chọn 10-12 từ trọng tâm nhất trong SGK
   - Ngữ pháp: giải thích bằng tiếng Việt đơn giản, có ví dụ
   - Quiz: 8-9 câu dễ/trung bình + 1-2 câu nâng cao/Unit

2. **Format HTML trong chuỗi meaning:**
   ```html
   "<strong>Nghĩa chính</strong>.<br/><em class='text-xs text-gray-500'>Giải thích thêm.</em>"
   ```

3. **Icon colors theo chuẩn (Lớp 8 HK2):**
   - Unit 7 (Môi trường):  `from-green-500 to-lime-500` | `from-lime-500 to-teal-500` | `from-teal-500 to-green-600`
   - Unit 8 (Shopping):    `from-amber-500 to-orange-500` | `from-orange-400 to-red-500`
   - Unit 9 (Disasters):   `from-blue-500 to-cyan-600` | `from-cyan-500 to-sky-600`
   - Review 3:             `from-violet-500 to-purple-600` | `from-purple-500 to-violet-600`
   - Unit 10 (Ecotourism): `from-green-600 to-emerald-500`
   - Unit 11 (Science):    `from-sky-500 to-blue-500`
   - Unit 12 (Planets):    `from-indigo-500 to-violet-500`
   - Review 4:             `from-rose-500 to-pink-600`

4. **unitColors & unitLabels trong App.tsx:**
   ```tsx
   const unitColors = { 7: 'bg-lime-100 text-lime-700', 8: 'bg-amber-100 text-amber-700',
     9: 'bg-cyan-100 text-cyan-700', 98: 'bg-violet-100 text-violet-700',
     10: 'bg-green-100 text-green-700', 11: 'bg-sky-100 text-sky-700',
     12: 'bg-indigo-100 text-indigo-700', 99: 'bg-rose-100 text-rose-700' };
   ```

---

## Checklist Trước Khi Deploy

- [ ] Xóa file không liên quan (`SKILL EDUCATION/`, `metadata.json`, `dist/`)
- [ ] Cập nhật `<title>` và `<meta description>` trong `index.html`
- [ ] Cập nhật text hero h1, description, floating card trong `App.tsx`
- [ ] Thêm đúng nội dung Unit (vocab, exercises, quiz, lessons) trong `data.tsx`
- [ ] Kiểm tra số lượng quiz = tổng câu hiển thị trong UI (ví dụ: 70 câu)
- [ ] Kiểm tra thời gian quiz (45 phút cho 70 câu)
- [ ] `npm run dev` → test toàn bộ tính năng
- [ ] Kiểm tra responsive trên mobile
- [ ] `npm run build` → không có lỗi TypeScript
- [ ] Push GitHub → deploy Vercel

---

## Thông Tin Giáo Viên

- **Giáo viên:** Thầy Võ Ngọc Tùng
- **Trường:** THCS Nguyễn Văn Bánh - Vĩnh Long
- **Zalo:** 0814 666 040
- **Link Zalo:** https://zalo.me/0814666040

> Nhớ cập nhật thông tin giáo viên trong `App.tsx` phần Teacher Info và Footer nếu dùng cho giáo viên khác.
