import { Icon } from "@iconify/react";
import Image from "next/image";

const ProfileBar = () => {
  return (
    <div className="absolute flex items-center p-4 bottom-0 left-0 bg-stone-900 w-full">
      <div className="relative w-10 h-10 rounded-lg overflow-hidden">
        <Image
          src="https://i.pinimg.com/564x/a0/81/55/a08155427a44e000276681a166c65337.jpg"
          alt="profile"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <h4 className="ml-5 text-gray-50/80 text-md font-semibold">
        Genevieve Navales
      </h4>

      <button className="text-gray-50/80 text-xl ml-auto">
        <Icon icon="icon-park-outline:logout" />
      </button>
    </div>
  );
};

export default ProfileBar;
