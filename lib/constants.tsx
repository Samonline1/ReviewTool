
import React from 'react';
import { Template } from './types';

const wrapMessage = (msgBody: string, biz: string, link: string) => {
  // 1. Remove leading numbers and dots (e.g. "1. ", "61. ")
  // 2. Remove trailing placeholders like "[Link]" or "👇" or "[link]" if they exist in the raw string
  let cleanBody = msgBody
    .replace(/^\d+\.\s*/, '')
    .replace(/\[Link\]/gi, '')
    .replace(/👇/g, '')
    .trim();
  
  // Format: [Message Body] \n\n 👇 \n [Link] \n\n [Greeting]
  return `${cleanBody}\n\n👇\n${link}\n\nThank you for visiting ${biz} 🙏`;
};

export const POSITIVE_TEMPLATES: Template[] = [
  "Your plate is empty 🍽️\nYour mood looks good 😄\nNow make our day too 👉 Click & review",
  "Good food = good mood 😋\nGood mood = good review ⭐\nClick below",
  "If today’s meal made you smile 😊\nTell Google about it here",
  "Full stomach. Happy heart. ❤️\nNow a quick review?",
  "You enjoyed the food 😄\nWe’ll enjoy your review ⭐\nClick here",
  "One review = big support for us 🙌\nTakes just 60 seconds",
  "If this meal was “worth it” 😌\nSay it here",
  "Already on your phone? 📱\nPerfect time for a quick review",
  "Food done. Bill paid.\nReview pending 😄\nFix it here",
  "Your review helps small businesses grow 🌱\nDrop yours here",
  "If you’d come back again 😉\nWrite that first",
  "Honest reviews = better food next time 😋\nClick here",
  "This review will take less time than scrolling reels 😄\nTry it",
  "Loved the food?\nSay it loud on Google ⭐",
  "Your feedback fuels our kitchen 🔥\nShare it here",
  "One tap. One review.\nLots of motivation ❤️",
  "We cooked. You enjoyed.\nNow Google needs to know 😄",
  "If you smiled after the last bite 😋\nClick below",
  "Good experiences deserve good reviews ⭐\nShare yours",
  "Help future foodies decide 😄\nDrop a quick review",
  "Your words matter more than ads ❤️\nWrite a review here",
  "That “mmm” moment 😋\nPut it into words here",
  "If this was a 5-star meal ⭐⭐⭐⭐⭐\nSay it here",
  "One honest review = big help 🙏\nClick below",
  "You ate well 😄\nNow write well ✍️",
  "Still thinking about the food? 😋\nTell Google why",
  "A minute for you, motivation for us ❤️\nReview here",
  "If today’s visit made your day better 😊\nShare it here",
  "Your review helps us serve you better next time 🍽️",
  "Quick favor?\nDrop a review here",
  "If you’d recommend us to friends 😄\nStart with Google",
  "Loved it? Liked it?\nSay it here",
  "Food memories fade, reviews stay 😄\nWrite one here",
  "Help us stay awesome ⭐\nReview here",
  "That last bite deserves a review 😋",
  "Your review = our smile 😊\nClick here",
  "Good food tastes better with good reviews 😄",
  "Make our chef happy today 👨‍🍳\nLeave a review",
  "If you enjoyed today 😄\nLet others know",
  "One small review. Big thanks ❤️",
  "Food done. Happiness done.\nReview next 😄",
  "Honest reviews keep us improving 🔁",
  "If this felt “paise vasool” 😄\nSay it here",
  "Loved the vibe? Loved the food?\nTell Google",
  "Your opinion matters more than ratings ⭐",
  "This review helps us grow 🌱\nClick here",
  "If you enjoyed even one dish 😋\nWrite it here",
  "Your review helps new customers choose wisely 😄",
  "A happy guest review = best reward ❤️",
  "Thanks for dining with us 😄\nReview here",
  "One click. One smile.",
  "You liked it. Google needs proof 😄",
  "Let your taste speak ⭐",
  "A review today = better service tomorrow",
  "Turn your experience into words ✍️",
  "Food fades. Reviews last 😄",
  "If this meal hit the spot 😋",
  "Your review helps us serve better plates 🍽️",
  "Big thanks for visiting ❤️\nSmall review here",
  "End the meal on a high note ⭐"
].map((raw, i) => ({
  id: `pos-${i}`,
  name: `English Option ${i + 1}`,
  text: (biz, link) => wrapMessage(raw, biz, link)
}));

export const NEUTRAL_TEMPLATES: Template[] = [
  "Thanks for visiting us.\nWe’d love your honest feedback",
  "Your experience matters to us.\nShare it here",
  "We’re always improving — your review helps",
  "Not perfect? Still learning.\nTell us here",
  "Every review helps us get better 🔁",
  "Quick feedback = better service next time",
  "Honest thoughts welcome here",
  "We value real opinions.\nShare yours",
  "Tell us what worked — and what didn’t",
  "Your feedback helps shape our service",
  "One minute feedback request 🙏",
  "Help us understand your visit better",
  "Your words help us grow 🌱",
  "No pressure — just honest feedback",
  "We’re listening 👂\nReview here",
  "Your review helps future guests",
  "Thanks for stopping by.\nShare your thoughts",
  "Real feedback > perfect ratings",
  "Let us know how we did",
  "Your opinion matters"
].map((raw, i) => ({
  id: `neu-${i}`,
  name: `English Feedback ${i + 1}`,
  text: (biz, link) => wrapMessage(raw, biz, link)
}));

export const NEGATIVE_TEMPLATES: Template[] = [
  "We’re sorry your experience fell short.\nPlease share feedback here",
  "We missed the mark today — that’s on us.\nTell us how to improve",
  "Not the experience we want for our guests.\nYour feedback helps",
  "We take feedback seriously.\nPlease share it here",
  "We regret disappointing you.\nLet us know what went wrong",
  "Every honest review helps us improve",
  "We’re listening — really.\nShare feedback here",
  "We’d like to do better next time.\nHelp us understand",
  "Sorry we couldn’t meet expectations.\nTell us more",
  "Your feedback matters, even when it’s tough",
  "We appreciate honesty — good or bad",
  "Not perfect today. Working to improve",
  "We value transparency.\nShare your experience",
  "Thanks for giving us a chance.\nHelp us learn",
  "We’re sorry. Please tell us what happened",
  "Your feedback helps us fix issues",
  "We want to earn your trust",
  "Not happy today — let us know why",
  "We’ll take responsibility.\nShare feedback",
  "We’re committed to improving\nYour review helps"
].map((raw, i) => ({
  id: `neg-${i}`,
  name: `English Support ${i + 1}`,
  text: (biz, link) => wrapMessage(raw, biz, link)
}));

export const HINDI_TEMPLATES: Template[] = [
  "1. पेट भर गया? 😋\nदिल भी खुश है? ❤️\nतो नीचे क्लिक करके रिव्यू भी लिख दो 😄",
  "2. खाना खत्म 🍽️\nमूड सेट 😌\nअब रिव्यू भी हो जाए?",
  "3. अगर खाना “मस्त था” लगा 😋\nतो वही Google पर भी लिख दो 👇",
  "4. बिल दे दिया ✔️\nखाना एन्जॉय किया ✔️\nअब रिव्यू बाकी है 😜",
  "5. अगर आख़िरी बाइट के बाद स्माइल आई 😄\nतो नीचे क्लिक कर दो 👇",
  "6. खाना अच्छा लगा? 😋\nतो रिव्यू भी अच्छा लिख दो 😄",
  "7. अभी फोन हाथ में है 📱\nतो रिव्यू लिखने का सही टाइम है 😄",
  "8. पेट खुश = दिल खुश ❤️\nदिल खुश = रिव्यू पक्का ⭐",
  "9. अगर “फिर आएंगे” सोचा है 😉\nतो पहले रिव्यू लिख दो 😄",
  "10. खाना कमाल था? 🔥\nतो Google को भी बता दो 👇",
  "11. ये रिव्यू\nहमारे शेफ की मोटिवेशन है 👨‍🍳❤️\nनीचे क्लिक करो 👇",
  "12. खाना खा लिया 😋\nअब 1 मिनट का काम बाकी है 😄",
  "13. अगर आज का खाना\n“पैसे वसूल” लगा 😄\nतो रिव्यू ज़रूर लिखो 👇",
  "14. आपका एक रिव्यू 🙏\nहमारे लिए बहुत बड़ी बात है ❤️",
  "15. खाना याद रहेगा 😋\nरिव्यू लिखोगे तो और अच्छा रहेगा 😄",
  "16. थाली खाली 🍽️\nदिल भरा ❤️\nअब रिव्यू भी भर दो 😄",
  "17. अच्छा लगा?\nतो Google पर बोल दो 😄",
  "18. 1 क्लिक = हमारी पूरी टीम की स्माइल 😊",
  "19. अगर खाना घर जैसा लगा 😌\nतो रिव्यू में भी वही लिख दो 😄",
  "20. आज का एक्सपीरियंस कैसा लगा? 🙂\nनीचे क्लिक करके बता दो 👇"
].map((raw, i) => ({
  id: `hi-${i}`,
  name: `Hindi Option ${i + 1}`,
  text: (biz, link) => wrapMessage(raw, biz, link)
}));

export const HINGLISH_TEMPLATES: Template[] = [
  "21. Pet full 😋\nMood mast 😄\nAb thoda sa review bhi ho jaaye? 👇",
  "22. Khana enjoy kiya? 🍽️\nToh Google pe thoda pyaar dikha do ❤️",
  "23. Agar aaj ka khana\n“full paisa vasool” laga 😄\nToh review bhi full stars ka banta hai ⭐",
  "24. Bill ho gaya ✔️\Taste yaad rahega 😋\nReview likh do yaar 😄",
  "25. Abhi phone haath mein hai 📱\nScroll mat karo 😜\nReview likh do 👇",
  "26. Agar aap bole\n“bhai maza aa gaya” 😌\nToh Google pe bhi wahi likh do 😄",
  "27. Ek chhota sa review 🙏\nHumari poori team ka din bana dega ❤️",
  "28. Aaj ka khana thoda sa special laga? 😋\nToh review bhi special likho 👇",
  "29. Pet toh bhar gaya 😄\nAb Google ka pet bhi bhar do ⭐",
  "30. Agar dobara aane ka plan hai 😉\nToh pehle review likh do 😄"
].map((raw, i) => ({
  id: `hin-${i}`,
  name: `Hinglish Option ${i + 1}`,
  text: (biz, link) => wrapMessage(raw, biz, link)
}));

export const MOOD_EMOJIS = ['😡', '🙁', '😐', '🙂', '🤩'];
