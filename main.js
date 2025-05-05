import { Tree } from "./bst.js";

const getRandomArray = (size) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) return;
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

// Create and test BST
const randomArray = getRandomArray(10);
const tree = Tree(randomArray);
console.log("Initial tree:");
prettyPrint(tree.getRoot());
console.log("Is balanced:", tree.isBalanced());

// Print traversals
console.log("Level order:");
tree.levelOrder((node) => console.log(node.data));
console.log("In order:");
tree.inOrder((node) => console.log(node.data));
console.log("Pre order:");
tree.preOrder((node) => console.log(node.data));
console.log("Post order:");
tree.postOrder((node) => console.log(node.data));

// Unbalance tree
tree.insert(150);
tree.insert(200);
tree.insert(300);
console.log("\nAfter adding >100 numbers:");
prettyPrint(tree.getRoot());
console.log("Is balanced:", tree.isBalanced());

// Rebalance tree
tree.rebalance();
console.log("\nAfter rebalancing:");
prettyPrint(tree.getRoot());
console.log("Is balanced:", tree.isBalanced());

// Print traversals again
console.log("Level order:");
tree.levelOrder((node) => console.log(node.data));
console.log("In order:");
tree.inOrder((node) => console.log(node.data));
console.log("Pre order:");
tree.preOrder((node) => console.log(node.data));
console.log("Post order:");
tree.postOrder((node) => console.log(node.data));