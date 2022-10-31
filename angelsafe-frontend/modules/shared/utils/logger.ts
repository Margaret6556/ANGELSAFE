type ModuleType =
  | "auth"
  | "api"
  | "chat"
  | "groups"
  | "home"
  | "more"
  | "post"
  | "profile";

export default function logger(module: ModuleType, msg: string | Object) {
  console.log(`${module.toUpperCase()}: `, msg);
}
