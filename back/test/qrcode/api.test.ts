

test("Qr Code", async () => {
    const response = await fetch("http://localhost:3000/qrcode/generate-totp-secret", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: "12345",
            nickname: "johnDoe",
            email: "john@example.com",
        })
    });
    expect(response.status).toBe(201);
    const data = await response.json();
    console.log(data);
});