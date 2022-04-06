import { useEffect } from "react";
import Button from "../Button";
import { UniqueErgo1, UniqueErgo2, UniqueErgo3, UniqueErgo4 } from "../icons";

let cards = [
  {
    title: "RESEARCH-LED AND REAL-WORLD FOCUSED",
    text: "Blockchain is a rapidly-advancing field that offers many exciting developments, with more applications and use cases appearing every day. However, this innovation often comes with a ‘move fast and break things’ approach to software development that doesn’t sit well when dealing with millions or even billions of dollars of users’ financial value.",
    url: "https://www.youtube.com/embed/QH2-TGUlwu4",
    buttoText: "EXPLORE",
    icon: <UniqueErgo1 />
  },
  {
    title: "POWERFUL AND SAFE",
    text: "Blockchain is a rapidly-advancing field that offers many exciting developments, with more applications and use cases appearing every day. However, this innovation often comes with a ‘move fast and break things’ approach to software development that doesn’t sit well when dealing with millions or even billions of dollars of users’ financial value.",
    url: "https://www.youtube.com/embed/QH2-TGUlwu4",
    buttoText: "EXPLORE",
    icon: <UniqueErgo2 />
  },
  {
    title: "INTELLIGENT AND STRAIGHTFORWARD",
    text: "Blockchain is a rapidly-advancing field that offers many exciting developments, with more applications and use cases appearing every day. However, this innovation often comes with a ‘move fast and break things’ approach to software development that doesn’t sit well when dealing with millions or even billions of dollars of users’ financial value.",
    url: "https://www.youtube.com/embed/QH2-TGUlwu4",
    buttoText: "EXPLORE",
    icon: <UniqueErgo3 />
  },
  {
    title: "SECURE AND ACCESSIBLE",
    text: "Blockchain is a rapidly-advancing field that offers many exciting developments, with more applications and use cases appearing every day. However, this innovation often comes with a ‘move fast and break things’ approach to software development that doesn’t sit well when dealing with millions or even billions of dollars of users’ financial value.",
    url: "https://www.youtube.com/embed/QH2-TGUlwu4",
    buttoText: "EXPLORE",
    icon: <UniqueErgo4 />
  },
];

export default function UniqueErgo() {
  useEffect(() => {
    const cards = document.querySelectorAll(".card");
    console.log(cards);
    let activeCard = cards[0];

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        activeCard.classList.remove("active");
        activeCard = card;
        activeCard.classList.add("active");
      });
    });
  }, []);

  return (
  
    <div className="mt-28 relative z-20 overflow-x-auto no-scrollbar">
      <div className="antialiased flex items-center justify-center my-8 min-w-[1000px]">
        <div className="flex h-[638px] items-stretch min-w-md overflow-hidden w-full">
          {cards.map((card, index) => (
            <div
              key={index}
              className={"bg-center bg-cover bg-brand-black card cursor-pointer flex-grow min-w-14 overflow-hidden relative transition-base border-[1px] border-[#2A2A2A]" + (index === 0 ? " active" : "")}
            >
              <div className="absolute top-16 lg:top-8 flex label mb-3 ml-4 lg:ml-24 transition-base z-20 text-[16px] lg:text-[24px] flex-col">
                <div>{card.icon}</div>
                <div className="mt-8 max-w-[300px]">{card.title}</div>
              </div>
              <div className="absolute bottom-0 from-transparent h-1/2 inset-x-0 opacity-0 shadow to-black transform transition-base translate-y-1/2 z-10 text-[#989898] dark:text-[#989898] max-w-xs lg:max-w-sm ml-6 lg:ml-[106px]">
                {card.text}
                {card.url !== undefined ? (
                  <div className="-ml-4 mt-12 sm:mt-10 lg:mt-16">
                    <Button
                      text={card.buttoText}
                      url={card.url}
                      newTab={true}
                      underline={true}
                      textColor="brand-orange"
                      background={false}
                      icon="ArrowRight"
                      iconColor="orange"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
