export async function handler(event){
  if(event.body !== process.env.ADMIN_PASSWORD){
    return { statusCode: 401 };
  }
  return { statusCode: 200 };
}
