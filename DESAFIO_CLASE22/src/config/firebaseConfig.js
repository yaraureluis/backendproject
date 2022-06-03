import admin from "firebase-admin";
const firebaseConfig = {
  type: "service_account",
  project_id: "proyectocoder-d95b0",
  private_key_id: "ffb41ac1fde6a69579d132b2bec7fa6f5b10040c",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCWMheIBn6lzWmS\nqu0IgM9oS3LaqRCuMnLoUm11fKfsIW1dcCXR+KuQWyapmP5+OTW88GzGu8X3MTlp\nel+wpHeDvVnKlh1lPvevfTMn/SjC9V5oE4xJhoLFOtnmU6qEKLp/D0+4Y2IyYeNJ\nqe92seeo0RAEJKEJX9HqNga9OnLk3bXx+j7YMwpcpw9GufShCk1n5DTWaWH7LBan\n7y1Z0n5dKoz5SI2tiGxpwsm7QGzUsBqPi5NWSD3F0qY71EyCtaNXDCfCcdzZhwyh\nqPrgxsmeSnivUKHNGGU/vg/mShdjiPmyfQI6tXQKHxa6k/lL5S2h6w1JqvqL0XN2\nK8AY+bFlAgMBAAECggEAA6aaDdNilrMkgs0mz9MZt4ZF92yunB1bz6vZP0bVahbx\n6piEQtNRkEO2795pKTZIyRvq+PWtfTG0HI098DQ/N3ON0C/P7RsXuCtJ6AnuSLbg\nIZWADnV3jkW88C1OcsHurpH3tRqtU14vwSWhTXhLkj3qrr8ZLvomRxQjG8xk6I01\nih4UJ41vDzNtluDRX85qnXW+UL10+NWo2Lo4AqDNqW/9mE48aiOKjp9D9PmdvSho\nALN9IBj/1jomxT/bF1R0noCAcdGqyrfq7Ll5xAV3ieFpNv4fo2fg8V4nVihRz3Rd\nJTZTPXR8eYUphGoaj6UEcgXheuV/X5x7kXc2Er7ITQKBgQDLEOnrR83H3Dd4Rjps\npdOhTJDUt+RepI0IToVbRf6WuWA3JZ4Om4jzU9I6u0Wt5QxBZpnwVBBFRLPGXLY8\niEPNJWny5xza0SCFXoBaj+d1ugIkulkfL24zvDaNbKzYf5+zdW/s0p4oCQTQ1HPB\nQbTnzX7g8qedpsnpSCFhAmZB0wKBgQC9WQJ2Vc4Zvegmnwvx8e0py+F5HHePbLJk\nQ2Lz2YXBrNh4z/87WqSQXIRP9zWb8GuTjulO3eEzm1EsyK3WQYxcY0V9SEVSUogD\nD6tcGRIuOzsijmJGv8+97b0SQRod+4GvaAs+QrDwuVOjVeAaMIDuZpwkgFFCrrwk\nJEXn2n8E5wKBgQCetHVdoRy/GulvYtO+nkusQL7gwWgGX+yplVS8ZRP4kKEV+Jxz\nJjP+mIAxzrNCmUTeyGV/YvPkbzFh0ovK+2SiLJ+FbAMtMUyNb7I5FUb8x4dtVQba\nTKOAY5TvKwRboEMcaqgzGtjoyUOuQpzFaakNkZmcDYnauMQNQoZz3wA0aQKBgGZJ\nDh50zch0IVOzuVUy9oYMoDm3mhK9ikTFblACYtI0GCBzZBJhLeLaR5OXHLunjcWB\nfyFelQg20AwcQGQstrE141UBVIlbEiRtM4ml9X9J+fD577b+aS/VnLyetIgb1Hu3\n/dLdXg48XyUt/8jGCPBAN/sz4jHeiL4RZj4Qd2tjAoGAMVr6tkyLQnOv9shHS+84\nBe+jdoUMrcjfajd0ARcL9lMDjkEy+70DjB5uHdyp+2mtrSWGY+fnoAkYa1oHy/w0\nHFqPKhpCWbdCvDPxmkq8l5oSC4rQeAkBJvmGjR+z5ay9JeguG02DWdF9+jMxzjjX\nQljfLiwZHHxglpdsnG2jwyY=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-wmxak@proyectocoder-d95b0.iam.gserviceaccount.com",
  client_id: "107927862763529022013",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wmxak%40proyectocoder-d95b0.iam.gserviceaccount.com",
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

export const db = admin.firestore();
