
# 🤖 Validating Operational Transformations 🚀

## Introduction 👋

Operational Transformation (OT) is a 🧑‍🤝‍🧑 technique that allows multiple users to concurrently edit the same document in real-time. In this process, every change made by the user is represented as an operation that can be applied to the document. These operations need to be validated to ensure that they can be safely applied to the document. 💻

This project is about validating the operational transformations in JavaScript. We have an initial version of the validation function that takes three arguments:

- `staleContents` - The initial contents of the document before any operations were applied.
- `latestContents` - The contents of the document after all the operations have been applied.
- `operationsJSON` - A JSON string that represents an array of operations to be applied to the document.

## The Problem 🤔

The goal of the project is to update the validation function to handle all possible edge cases that might occur while applying the operations. We have a set of requirements and constraints that should be satisfied:

- You can't skip past the end of a string. ❌
- You can't delete past the end of a string. ❌
- Delete operations are applied forward while keeping the cursor in place. 🔢
- If the `operationsJSON` is not a valid JSON string, the function should return false. 🛑
- If any operation type other than "insert", "delete", or "skip" is encountered, the function return false. 🛑
- If the count of delete or skip operation is negative, the function should return false 🛑

## Solution 💡

🤖 The function first attempts to parse the `operationsJSON` string into an array of objects using `JSON.parse()`. If the parsing fails, the function logs an error message and returns `false`. 😞

🔍 Next, the function checks whether `staleContents` and `latestContents` are both strings. If either of them is not a string, the function logs an error message and returns `false`. 😕

💻 Then, the function initializes the cursor position to 0 and creates a new array called `result` that is a copy of `staleContents`.

🔄 The function then loops through each operation described in `operations`, and performs the corresponding action on `result`. If any of the operations go past the end or start of the string, or if an invalid operation type is provided, the function logs an error message and returns `false`. 🚫

🔍 Finally, the function checks if `result` matches `latestContents` after applying all operations. If they do not match, the function logs an error message and returns `false`. Otherwise, the function returns `true`. 😃

👉 The `isValid` function is exported as the default export of the module, which means it can be imported and used in other parts of the application. 💪

## Tests 🧪

We have written a total of nine tests in `index.spec.js` file that validates our implementation of the function. These tests cover all possible edge cases mentioned in the requirements section.

We are using the Jest testing framework to run the tests. You can run the tests by executing the command `npm test` in the terminal. 🧪

## Conclusion 🎉

Operational Transformation is a powerful technique that enables multiple users to collaborate in real-time. The validation of operations is a critical aspect of the OT algorithm, and it's essential to handle all possible edge cases that might occur while applying the operations. With the  validation function and the set of tests, we can ensure that the OT algorithm works as expected and handles all edge cases correctly. 🎓