const Node = (data) => ({
    data,
    left: null,
    right: null
});

export const Tree = (array) => {
    const buildTree = (array) => {
        if (!array || array.length === 0) return null;
        const sortedArray = [...new Set(array)].sort((a, b) => a - b);
        return buildTreeRec(sortedArray, 0, sortedArray.length - 1);
    };

    const buildTreeRec = (array, start, end) => {
        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);
        const node = Node(array[mid]);
        node.left = buildTreeRec(array, start, mid - 1);
        node.right = buildTreeRec(array, mid + 1, end);
        return node;
    };

    let root = buildTree(array);

    const insert = (value) => {
        root = insertRec(root, value);
    };

    const insertRec = (node, value) => {
        if (node === null) return Node(value);
        if (value < node.data) {
            node.left = insertRec(node.left, value);
        } else if (value > node.data) {
            node.right = insertRec(node.right, value);
        }
        return node;
    };

    const deleteItem = (value) => {
        root = deleteRec(root, value);
    };

    const deleteRec = (node, value) => {
        if (node === null) return null;
        if (value < node.data) {
            node.left = deleteRec(node.left, value);
        } else if (value > node.data) {
            node.right = deleteRec(node.right, value);
        } else {
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;
            const minNode = findMin(node.right);
            node.data = minNode.data;
            node.right = deleteRec(node.right, minNode.data);
        }
        return node;
    };

    const findMin = (node) => {
        while (node.left !== null) node = node.left;
        return node;
    };

    const find = (value) => {
        let current = root;
        while (current !== null) {
            if (value === current.data) return current;
            current = value < current.data ? current.left : current.right;
        }
        return null;
    };

    const levelOrder = (callback) => {
        if (!callback) throw new Error("Callback is required");
        const queue = [root];
        while (queue.length > 0) {
            const node = queue.shift();
            if (node) {
                callback(node);
                queue.push(node.left);
                queue.push(node.right);
            }
        }
    };

    const inOrder = (callback) => {
        if (!callback) throw new Error("Callback is required");
        inOrderRec(root, callback);
    };

    const inOrderRec = (node, callback) => {
        if (node !== null) {
            inOrderRec(node.left, callback);
            callback(node);
            inOrderRec(node.right, callback);
        }
    };

    const preOrder = (callback) => {
        if (!callback) throw new Error("Callback is required");
        preOrderRec(root, callback);
    };

    const preOrderRec = (node, callback) => {
        if (node !== null) {
            callback(node);
            preOrderRec(node.left, callback);
            preOrderRec(node.right, callback);
        }
    };

    const postOrder = (callback) => {
        if (!callback) throw new Error("Callback is required");
        postOrderRec(root, callback);
    };

    const postOrderRec = (node, callback) => {
        if (node !== null) {
            postOrderRec(node.left, callback);
            postOrderRec(node.right, callback);
            callback(node);
        }
    };

    const height = (value) => {
        const node = find(value);
        if (!node) return null;
        return heightRec(node);
    };

    const heightRec = (node) => {
        if (node === null) return -1;
        return 1 + Math.max(heightRec(node.left), heightRec(node.right));
    };

    const depth = (value) => {
        let current = root;
        let depthCount = 0;
        while (current !== null) {
            if (value === current.data) return depthCount;
            depthCount++;
            current = value < current.data ? current.left : current.right;
        }
        return null;
    };

    const isBalanced = () => {
        return isBalancedRec(root) !== -1;
    };

    const isBalancedRec = (node) => {
        if (node === null) return 0;
        const leftHeight = isBalancedRec(node.left);
        if (leftHeight === -1) return -1;
        const rightHeight = isBalancedRec(node.right);
        if (rightHeight === -1) return -1;
        if (Math.abs(leftHeight - rightHeight) > 1) return -1;
        return Math.max(leftHeight, rightHeight) + 1;
    };

    const rebalance = () => {
        const values = [];
        inOrder((node) => values.push(node.data));
        root = buildTree(values);
    };

    return {
        insert,
        deleteItem,
        find,
        levelOrder,
        inOrder,
        preOrder,
        postOrder,
        height,
        depth,
        isBalanced,
        rebalance,
        getRoot: () => root
    };
};