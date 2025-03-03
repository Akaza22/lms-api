export const successResponse = (res: any, message: string, data: any = null, status: number = 200): void => {
  res.status(status).json({
    success: true,
    statusCode: status, // Tambahkan status code dalam response
    message,
    data,
  });
};

export const errorResponse = (res: any, message: string, error: any = null, status: number = 500): void => {
  console.error(`[ERROR] ${message}:`, error); // Logging error untuk debugging
  res.status(status).json({
    success: false,
    statusCode: status, // Tambahkan status code dalam response
    message,
    error: error instanceof Error ? error.message : error, // Ambil pesan error jika ada
  });
};
