import Image from "next/image";
import { Button } from "../ui";
import { TitleComponent } from "./title";
import { Container } from "./container";

export const SurprizeSection = () => {
  return (
    <section className="w-full lg:h-[1190px] border-t-2 border-black relative z-30 mb-[100px]">
      <div className="absolute w-full h-[160px] lg:h-[380px] bg-[--blue] z-10 top-[180px] lg:top-[420px]"></div>
      <Container>
        <TitleComponent className="mb-[60px] lg:mb-[100px]">
          Створюй сюрпризи
        </TitleComponent>
        <div className="lg:flex gap-[100px] items-center lg:px-14 relative  z-30">
          <Image
            src="/surprize_box.png"
            width={318}
            height={318}
            alt="box"
            className="relative z-30 lg:w-[860px] lg:h-[860px] mb-8 lg:mb-0"
          />
          <Image
            src="/box_shadow.png"
            width={318}
            height={318}
            alt="shadow"
            className="absolute z-20 lg:w-[860px] lg:h-[860px] top-3 left-3"
          />
          <div className="lg:w-[450px]">
            <h3 className="font-segoe font-bold text-2xl lg:text-3xl pb-5">
              Формуй подарунковий бокс за власним смаком
            </h3>
            <p className="fornt-roboto font-normal text-base lg:text-2xl pb-7">
              Ти маєш можливість персоналізувати набори з тістечками згідно із
              своїми бажаннями та потребами.
            </p>
            <Button>Обирай</Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
