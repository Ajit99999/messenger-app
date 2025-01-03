export const friends = ["John", "Alex", "Harry"];

export const initialMessages = {
  John: [
    { id: Date.now(), text: "Hello John", sender: "me" },
    { id: Date.now() + 1000, text: "Hi My friend", sender: "John" },
  ],
  Alex: [
    { id: Date.now(), text: "Hey Alex", sender: "me" },
  ],
  Harry: [],
};
