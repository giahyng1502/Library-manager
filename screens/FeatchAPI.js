export const getData = async url => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const addBorrowing = async item => {
  try {
    const res = await fetch('http://10.0.3.2:3000/borrowing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        borrowerName: item.borrowerName,
        phoneNumber: item.phoneNumber,
        bookId: item.bookId,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
