const fruits = ["banana", "orange", "apple", "mango"];
const colors = ["red", "blue", "sepia", "black", "white", "yellow", "green"];

const rand = (arr: string[] | number[]) => {
  return Math.floor(Math.random() * arr.length);
};

const random4digits = () => Math.floor(1000 + Math.random() * 9000);
export default function () {
  const fruit = fruits[rand(fruits)];
  const digits = random4digits();
  const color = colors[rand(colors)];

  return `${digits}.${color}.${fruit}`;
}
