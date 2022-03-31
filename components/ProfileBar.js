import { Icon } from "@iconify/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";

const ProfileBar = () => {
  const signOutApp = () => {
    signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}/` });
  };

  const { data: session } = useSession();

  return (
    <div className="absolute flex items-center p-4 bottom-0 left-0 bg-neutral-900 w-full">
      <div className="relative w-10 h-10 rounded-lg overflow-hidden">
        {session && (
          <Image
            src={session?.user?.image}
            alt="profile"
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>

      <h4 className="ml-5 text-gray-50/80 text-md font-semibold">
        {session?.user?.name}
      </h4>

      <button onClick={signOutApp} className="text-gray-50/80 text-xl ml-auto">
        <Icon icon="icon-park-outline:logout" />
      </button>
    </div>
  );
};

export default ProfileBar;
