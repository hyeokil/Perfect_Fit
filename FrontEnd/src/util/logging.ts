export const logOnDev = (message:string | object) => {
  if (import.meta.env.MODE === "development" ) {
    console.log(message)
  }
}