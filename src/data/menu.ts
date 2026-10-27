import master from '../assets/masterchikinburger.webp';
import teriyaki from '../assets/teriyakichikinburger.webp';
import set from '../assets/masterchikinburgerpotetoset.webp';
import twister from '../assets/asiantwister.webp';
import yangnyeom from '../assets/yannyomuchikin.webp';

// Supplied figures are delivery prices. Store prices remain unset.
export const menu = [
  {
    id: 'master', number: '01', image: master, price: null as number | null,
    name: { ja: 'マスターチキンバーガー', en: 'Master Chicken Burger' },
    englishLines: ['MASTER', 'CHICKEN BURGER'],
    description: {
      ja: 'サクサクの衣に、ジューシーなチキン。食べ応えのある、当店自慢のチキンバーガーです。',
      en: 'A crispy coating, juicy chicken and a satisfying bite. Meet our signature chicken burger.',
    },
    alt: { ja: 'マスターチキンバーガーの商品写真', en: 'Master Chicken Burger with crispy chicken and lettuce' },
  },
  {
    id: 'teriyaki', number: '02', image: teriyaki, price: null as number | null,
    name: { ja: 'てりやきチキンバーガー', en: 'Teriyaki Chicken Burger' },
    englishLines: ['TERIYAKI', 'CHICKEN BURGER'],
    description: {
      ja: 'ジューシーなチキンに、甘辛いてりやきソース。日本ならではの味わいを楽しめるバーガーです。',
      en: 'Juicy chicken with a sweet and savoury teriyaki sauce. A taste of Japan, one bite at a time.',
    },
    alt: { ja: 'てりやきチキンバーガーの商品写真', en: 'Teriyaki Chicken Burger with glazed chicken and lettuce' },
  },
  {
    id: 'set', number: '03', image: set, price: null as number | null,
    name: { ja: 'マスターチキンバーガーポテトセット', en: 'Master Chicken Burger Set' },
    englishLines: ['MAKE IT', 'A SET.'],
    description: {
      ja: 'マスターチキンバーガーに、フライドポテトとドリンクをプラス。しっかり食べたい日に。',
      en: 'Your Master Chicken Burger, with fries and a drink. A little more of everything you love.',
    },
    alt: { ja: 'マスターチキンバーガー、ポテト、ドリンクのセット写真', en: 'Master Chicken Burger served with fries and a drink' },
  },
  {
    id: 'twister', number: '04', image: twister, price: null as number | null,
    name: { ja: 'アジアンツイスター', en: 'Asian Twister' },
    englishLines: ['ASIAN', 'TWISTER'],
    description: {
      ja: 'チキンと香り豊かなスパイス、ソースを包んだチキンラップ。バーガーとはひと味違うおいしさを。',
      en: 'Chicken, aromatic spices and sauce in an Asian-style wrap. A different way to enjoy your chicken.',
    },
    alt: { ja: 'アジアンツイスターの商品写真', en: 'Asian Twister chicken wrap with lettuce and sauce' },
  },
  {
    id: 'yangnyeom', number: '05', image: yangnyeom, price: null as number | null,
    name: { ja: 'ヤンニョムチキン', en: 'Yangnyeom Chicken' },
    englishLines: ['YANGNYEOM', 'CHICKEN'],
    description: {
      ja: 'サクサクのチキンに、韓国風の甘辛いソースを絡めて。旨味と辛さがあとを引く一品です。',
      en: 'Crispy chicken coated in a Korean-style sweet and spicy sauce. Sticky, savoury and full of flavour.',
    },
    alt: { ja: '甘辛いソースを絡めたヤンニョムチキンの商品写真', en: 'Yangnyeom chicken coated in sweet and spicy sauce' },
  },
];
export type MenuItem = (typeof menu)[number];
