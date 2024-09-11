const baseUrl="http://localhost:3000"

export async function getMeals() {
    try {
        const response = await fetch(`${baseUrl}/meals`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return { message: "Error fetching meals. Please try again later.", status: 400 };
    }
}

export async function postOrder(data) {
    const { items, customer } = data;
    const { name, email, postalCode, street, city } = customer;

    try {
        const response = await fetch(`${baseUrl}/orders`, {
            method: "POST",
            body: JSON.stringify({
                order: {
                    items,
                    customer: {
                        name,
                        email,
                        "postal-code": postalCode,
                        street,
                        city
                    }
                }
            }),
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const resData = await response.json();
        return { message: resData.message, status: 201 };
    } catch (error) {
        return { message: "Error creating order. Please try again later.", status: 400 };
    }
}