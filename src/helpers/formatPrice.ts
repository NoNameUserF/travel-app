const formatPrice = (price: number = 0, userSelectedCurrency = "USD") => (price == 0 ? "Бесплатно" : `${price} ${userSelectedCurrency}`);

export default formatPrice;
