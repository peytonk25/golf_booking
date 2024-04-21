// declare module "*.css";
// declare module "*.scss";

/*
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
*/
declare module '*.gif'
declare module '*.svg'
declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
}
