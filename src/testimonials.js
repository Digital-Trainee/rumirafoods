export const testimonials = [
  {
    productId: 'powders-onion-powder', productName: 'Onion Powder', reviewer: 'Priya Sharma', rating: 5,
    quote: "I've been using Onion Powder for everyday cooking, and it's really convenient. It saves preparation time and adds a nice flavour to gravies. Very useful product!"
  },
  {
    productId: 'powders-tomato-powder', productName: 'Tomato Powder', reviewer: 'Rahul Deshmukh', rating: 5,
    quote: 'Tomato Powder is a great addition to my kitchen. I use it for pasta, soups and gravies. It mixes well and gives a lovely tomato flavour.'
  },
  {
    productId: 'powders-green-chilli-powder', productName: 'Green Chilli Powder', reviewer: 'Sneha Patil', rating: 5,
    quote: 'Really liked the Green Chilli Powder. The spice level is just right for our family, and a little quantity goes a long way. Good quality!'
  },
  {
    productId: 'powders-methi-powder', productName: 'Methi Powder', reviewer: 'Anjali Kulkarni', rating: 4,
    quote: 'Methi Powder has made cooking easier for me. I use it in parathas and sabzi, and the flavour comes out really nice. Happy with my purchase.'
  },
  {
    productId: 'powders-moringa-powder', productName: 'Moringa Powder', reviewer: 'Neha Shah', rating: 5,
    quote: "I recently tried Moringa Powder and liked how easily it mixes into my morning smoothies. It's also convenient to add to different homemade recipes."
  },
  {
    productId: 'powders-amla-powder', productName: 'Amla Powder', reviewer: 'Pooja Mehta', rating: 5,
    quote: "Amla Powder is convenient and easy to use. I've tried it in a few homemade preparations and really liked the fine texture. Good experience overall."
  },
  {
    productId: 'powders-beetroot-powder', productName: 'Beetroot Powder', reviewer: 'Rutuja Joshi', rating: 5,
    quote: 'I absolutely loved the Beetroot Powder! I used it to make colourful rotis and homemade snacks. The colour turned out beautifully without much effort.'
  },
  {
    productId: 'powders-curry-leaf-powder', productName: 'Curry Leaf Powder', reviewer: 'Kavita Nair', rating: 4,
    quote: "Curry Leaf Powder is very handy, especially when I don't have fresh curry leaves at home. It adds a nice flavour to chutneys and everyday dishes."
  },
  {
    productId: 'powders-carrot-powder', productName: 'Carrot Powder', reviewer: 'Meenal Agarwal', rating: 5,
    quote: 'I purchased Carrot Powder to experiment with different recipes. It is easy to use and blends nicely into the food. Quite happy with the product.'
  },
  {
    productId: 'fruits-apple-slices', productName: 'Apple Slices', reviewer: 'Aditi Desai', rating: 5,
    quote: "Apple Slices are a convenient snack to carry while travelling or working. I liked the taste and the fact that they're easy to store. Will order again."
  },
  {
    productId: 'fruits-chikoo-slices', productName: 'Chikoo Slices', reviewer: 'Nikhil Pawar', rating: 4,
    quote: "I tried Chikoo Slices for the first time, and the taste was quite interesting. It's something different from the usual snacks. Worth trying!"
  },
  {
    productId: 'fruits-strawberry-slices', productName: 'Strawberry Slices', reviewer: 'Riya Kapoor', rating: 5,
    quote: 'Strawberry Slices have become one of my favourite breakfast toppings. I add them to my cereal and yoghurt. Really enjoy the fruity flavour.'
  },
  {
    productId: 'fruits-pineapple-pieces', productName: 'Pineapple Pieces', reviewer: 'Akash Jain', rating: 5,
    quote: 'I carried Pineapple Pieces on my recent trip, and they were so convenient to snack on. Nice fruity taste and easy to carry anywhere.'
  },
  {
    productId: 'fruits-guava-slices', productName: 'Guava Slices', reviewer: 'Sonali More', rating: 4,
    quote: 'Being a guava lover, I wanted to try Guava Slices. They have an interesting taste and are a nice change from regular packaged snacks.'
  },
  {
    productId: 'millets-millet-laddu', productName: 'Millet Laddus', reviewer: 'Vaishali Patil', rating: 5,
    quote: 'My family really enjoyed the Millet Laddus. The taste reminds me of traditional homemade laddus, and the sweetness was nicely balanced.'
  },
  {
    productId: 'millets-ragi-laddu', productName: 'Ragi Laddus', reviewer: 'Amit Kulkarni', rating: 5,
    quote: 'I ordered Ragi Laddus for the first time and genuinely liked the taste. They have a nice texture and go really well with evening tea.'
  },
  {
    productId: 'millets-millet-dosa-premix', productName: 'Millet Dosa Premix', reviewer: 'Shweta Rao', rating: 5,
    quote: "Millet Dosa Premix makes breakfast preparation so much easier. The dosas turned out tasty, and I didn't have to spend much time preparing the batter."
  },
  {
    productId: 'millets-millet-pasta-with-masala', productName: 'Millet Pasta with Masala', reviewer: 'Rohit Sangle', rating: 5,
    quote: 'I wanted to try something different, so I ordered Millet Pasta with Masala. It was easy to prepare, and the masala flavour was really enjoyable.'
  },
  {
    productId: 'snacks-sweet-potato-chips', productName: 'Sweet Potato Chips', reviewer: 'Sakshi Bansal', rating: 4,
    quote: 'Sweet Potato Chips are a nice change from regular potato chips. I enjoyed the flavour and would definitely like to try more varieties.'
  },
  {
    productId: 'seasonings-chilli-flakes', productName: 'Chilli Flakes', reviewer: 'Karan Shah', rating: 5,
    quote: "I've been using Chilli Flakes on pizza, pasta and sandwiches. They add a nice spicy kick without overpowering the dish. Really happy with the product."
  }
];

export const testimonialForProduct = (productId) =>
  testimonials.find((testimonial) => testimonial.productId === productId);
