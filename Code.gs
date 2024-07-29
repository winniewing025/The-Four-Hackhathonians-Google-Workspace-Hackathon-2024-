const sheets = SpreadsheetApp.getActiveSpreadsheet();
const usersSheet = sheets.getSheetByName("users");
const customersSheet = sheets.getSheetByName("customers");
const productsSheet = sheets.getSheetByName("products");
const ordersSheet = sheets.getSheetByName("orders");
const representativesSheet = sheets.getSheetByName("sales representatives");

function doGet(e) {
    try {
        return HtmlService.createTemplateFromFile(e.parameter.page).evaluate();
    } catch {
        return HtmlService.createTemplateFromFile("login").evaluate();
    }
}

function authenticate(email, password) {
    var userRow = usersSheet
        .getRange("A:A")
        .createTextFinder(email)
        .matchEntireCell(true)
        .findAll()[0]
        ?.getRow();
    if (!userRow) return false;
    var userPassword = usersSheet.getRange(userRow, 2).getValue();
    if (password != userPassword) return false;
    return true;
}

function listProduct() {
    var productsData = productsSheet.getDataRange().getValues();
    var products = productsData
        .filter((data, i) => i !== 0)
        .map((data) => {
            return {
                code: data[0],
                name: data[1],
                price: data[2],
                stock: data[3],
            };
        });
    return JSON.stringify(products);
}

function listOrder() {
    var ordersData = ordersSheet.getDataRange().getValues();
    var orders = ordersData
        .filter((data, i) => i !== 0)
        .map((data) => {
            return {
                date: data[0],
                customer_name: data[1],
                customer_phone: data[2],
                customer_address: data[3],
                product_code: data[4],
                product_name: data[5],
                product_quantity: data[6],
                total: data[7],
                status: data[8],
                sales_representatives: data[9],
            };
        });
    return JSON.stringify(orders);
}

function listRepresentative() {
    var representativesData = representativesSheet.getDataRange().getValues();
    var representatives = representativesData
        .filter((data, i) => i !== 0)
        .map((data) => {
            return {
                id: data[0],
                name: data[1],
                age: data[2],
                birthday: data[3],
                phone: data[4],
                address: data[5],
                email: data[6],
            };
        });
    return JSON.stringify(representatives);
}

function addCustomer(data) {
    customer = [
        data.name,
        data.age,
        data.birthday,
        data.phone,
        data.address,
        data.email,
    ];
    customersSheet
        .getRange(customersSheet.getLastRow() + 1, 1, 1, customer.length)
        .setValues([customer]);
}

function deleteCustomer(email = "Again") {
    var customerRow = customersSheet
        .getRange("F:F")
        .createTextFinder(email)
        .matchEntireCell(true)
        .findAll()[0]
        ?.getRow();
    customersSheet.deleteRow(customerRow);
}

function listCustomer() {
    var customersData = customersSheet.getDataRange().getValues();
    var customers = customersData
        .filter((data, i) => i !== 0)
        .map((data) => {
            return {
                name: data[0],
                age: data[1],
                birthday: data[2],
                phone: data[3],
                address: data[4],
                email: data[5],
            };
        });
    return JSON.stringify(customers);
}
