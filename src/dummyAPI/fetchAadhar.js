export default function FetchFromAadhar(no) {
  const Aadhar = {
    "8174 4585 3880": {
      Name: "Bharat Malik",
      Email: "bharatmalik1999@gmail.com",
      Age: 22,
      address: "0x1a04dC29daae2A322EEB3f78E45D6F23434faf9B",
    },
    "8174 4585 3881": {
      Name: "Harshit",
      Email: "harshit0599@gmail.com",
      Age: 21,
      address: "0xeEAeCebc221257d697F5931D9ad45317066402a0",
    },
    "8174 4585 3882": {
      Name: "Keshav Goyal",
      Email: "keshav.goyal@nsut.ac.in",
      Age: 21,
      address: "0x1a04dC29daae2A322EEB3f78E45D6F23434faf9B",
    },
    "8174 4585 3883": {
      Name: "Ankit Maurya",
      Email: "28ankitmaurya@gmail.com",
      Age: 21,
      address: "0x2543B95Bc3C4404f2bC0C1B0C10734ee7F6eA46b",
    },
  };

  return Aadhar[no];
}
