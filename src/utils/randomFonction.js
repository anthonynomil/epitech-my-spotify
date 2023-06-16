export const handleResponsePagination = (index, numElem, data) => {
    let response = [];
    let start = index;
    let end = index + numElem;
    let end2 = data.length
    while (start < end && start < end2) {
        response.push(data[start]);
        start++;
    }
    return response;
}