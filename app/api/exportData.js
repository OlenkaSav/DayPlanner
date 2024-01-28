export default function exportHandler(req, res, data) {
  // Ваши данные для экспорта в формате JSON


  // Устанавливаем заголовок для ответа в формате JSON
  res.setHeader('Content-Type', 'application/json');
  
  // Отправляем данные в формате JSON
  res.status(200).json(data);
}