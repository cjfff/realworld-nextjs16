import { components } from "@/consts/schema";
import { createContainer } from "unstated-next";

function useUser(user?: components['schemas']['User']) {
  return { user };
}

export const Container = createContainer(useUser);

