export async function onRequestGet(context) {
  var env = context.env;
  var dbSet = !!env.DATABASE_URL;
  var tgTokenSet = !!env.TELEGRAM_BOT_TOKEN;
  var tgChatSet = !!env.TELEGRAM_CHAT_ID;

  var dbPreview = dbSet
    ? env.DATABASE_URL.substring(0, 30) + "..."
    : "(not set)";

  return new Response(JSON.stringify({
    database_url_set: dbSet,
    database_url_preview: dbPreview,
    telegram_bot_token_set: tgTokenSet,
    telegram_chat_id_set: tgChatSet,
  }, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
}
