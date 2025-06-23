// <script setup lang="ts"></script>
//
// <template>
//     <div class="flex flex-col gap-6 md:gap-4 md:flex-row-reverse justify-around md:items-center">
//         <div>
//             <UButton color="robRoy" variant="outline" :disabled="false" :external="true"
//             to="https://staging.sir.trading/">
//             <span class="font-sm font-semibold whitespace-nowrap">Launch Prototype</span>
//         </UButton>
//     </div>
//     <div class="flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-6 justify-around md:justify-center items-center">
//         <ULink class="flex justify-self-center" to="https://x.com/leveragesir" target="_blank">
//             <UIcon name="simple-icons:x" dynamic size="20px" class="text-white"/>
//         </ULink>
//         <ULink class="flex justify-self-center" to="https://discord.gg/M2SRBDPUR2" target="_blank">
//             <UIcon name="simple-icons:discord" dynamic size="24px" class="text-white"/>
//         </ULink>
//         <ULink class="flex justify-self-center" to="https://github.com/SIR-trading" target="_blank">
//             <UIcon name="simple-icons:github" dynamic size="24px" class="text-white"/>
//         </ULink>
//     </div>
// </div>
// </template>
//
// <style scoped></style>
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { FaDiscord, FaGithub, FaXTwitter } from "react-icons/fa6";

const NavigationTail = () => {
  return (
    <div className="flex flex-col justify-around gap-6 md:flex-row-reverse md:items-center md:gap-6">
      <div>
        <Button variant="outline" asChild>
          <Link
            href="https://staging.sir.trading/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="font-sm font-semibold whitespace-nowrap">
              Launch Prototype
            </span>
          </Link>
        </Button>
      </div>
      <div className="flex flex-row items-center justify-around gap-2 sm:gap-3 md:justify-center md:gap-4 lg:gap-8">
        <Link
          className="flex justify-self-center"
          href="https://x.com/leveragesir"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaXTwitter className="h-5 w-5 text-white" />
        </Link>
        <Link
          className="flex justify-self-center"
          href="https://discord.gg/M2SRBDPUR2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaDiscord className="h-6 w-6 text-white" />
        </Link>
        <Link
          className="flex justify-self-center"
          href="https://github.com/SIR-trading"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="h-6 w-6 text-white" />
        </Link>
      </div>
    </div>
  );
};

export default NavigationTail;
