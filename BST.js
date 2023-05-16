class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  class Tree {
    constructor(array) {
      this.root = buildTree(array);
    }
  
    insert(value) {
      const newNode = new Node(value);
  
      if (!this.root) {
        this.root = newNode;
        return;
      }
  
      let current = this.root;
      while (true) {
        if (value < current.data) {
          if (!current.left) {
            current.left = newNode;
            return;
          }
          current = current.left;
        } else if (value > current.data) {
          if (!current.right) {
            current.right = newNode;
            return;
          }
          current = current.right;
        } else {
          // Value already exists in tree
          return;
        }
      }
    }
  
    delete(value) {
      this.root = deleteNode(this.root, value);
    }
  
  
    find(value) {
      let current = this.root;
      while (current) {
        if (value === current.data) {
          return current;
        } else if (value < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
      return null;
    }
  
    levelOrder(callback) {
      if (!callback) {
        return this._levelOrderTraversal();
      }
  
      const queue = [];
      queue.push(this.root);
  
      while (queue.length > 0) {
        const current = queue.shift();
        callback(current);
  
        if (current.left) {
          queue.push(current.left);
        }
  
        if (current.right) {
          queue.push(current.right);
        }
      }
    }
  
    _levelOrderTraversal() {
      const values = [];
      const queue = [];
      queue.push(this.root);
  
      while (queue.length > 0) {
        const current = queue.shift();
        values.push(current.data);
  
        if (current.left) {
          queue.push(current.left);
        }
  
        if (current.right) {
          queue.push(current.right);
        }
      }
  
      return values;
    }
  
    inorder(callback) {
      if (!callback) {
        return this._inorderTraversal();
      }
  
      function traverse(node) {
        if (node.left) {
          traverse(node.left);
        }
  
        callback(node);
  
        if (node.right) {
          traverse(node.right);
        }
      }
  
      traverse(this.root);
    }
  
    preorder(callback) {
      if (!callback) {
        return this._preorderTraversal();
      }
  
      function traverse(node) {
        callback(node);
  
        if (node.left) {
          traverse(node.left);
        }
  
        if (node.right) {
          traverse(node.right);
        }
      }
  
      traverse(this.root);
    }
  
    postorder(callback) {
      if (!callback) {
        return this._postorderTraversal();
      }
  
      function traverse(node) {
        if (node.left) {
          traverse(node.left);
        }
  
        if (node.right) {
          traverse(node.right);
        }
  
        callback(node);
      }
  
      traverse(this.root);
    }
  
    _inorderTraversal() {
      const values = [];
  
      function traverse(node) {
        if (node.left) {
          traverse(node.left);
        }
  
        values.push(node.data);
  
        if (node.right) {
          traverse(node.right);
        }
      }
  
      traverse(this.root);
  
      return values;
    }
  
    _preorderTraversal() {
      const values = [];
  
      function traverse(node) {
        values.push(node.data);
  
        if (node.left) {
          traverse(node.left);
        }
  
        if (node.right) {
          traverse(node.right);
        }
      }
  
      traverse(this.root);
  
      return values;
    }
  
    _postorderTraversal() {
      const values = [];
  
      function traverse(node) {
        if (node.left) {
          traverse(node.left);
        }
  
        if (node.right) {
          traverse(node.right);
        }
  
        values.push(node.data);
      }
  
      traverse(this.root);
  
      return values;
    }
  
    rebalance() {
      const nodes = [];
      this._inorderTraversal((node) => nodes.push(node.data));
      const balancedRoot = buildTree(nodes);
      this.root = balancedRoot;
    }
  
  }
  
  function deleteNode(node, value) {
    if (!node) {
      return null;
    }
  
    if (value < node.data) {
      node.left = deleteNode(node.left, value);
      return node;
    }
  
    if (value > node.data) {
      node.right = deleteNode(node.right, value);
      return node;
    }
  
    // If node to be deleted has no children
    if (!node.left && !node.right) {
      return null;
    }
  
    // If node to be deleted has only one child
    if (!node.left) {
      return node.right;
    }
  
    if (!node.right) {
      return node.left;
    }
  
    // If node to be deleted has two children
    let minRight = node.right;
    while (minRight.left) {
      minRight = minRight.left;
    }
    node.data = minRight.data;
    node.right = deleteNode(node.right, minRight.data);
  
    return node;
  }
  
  function buildTree(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedArray.length / 2);
    const rootNode = new Node(sortedArray[middleIndex]);
  
    if (middleIndex > 0) {
      const leftArray = sortedArray.slice(0, middleIndex);
      rootNode.left = buildTree(leftArray);
    }
  
    if (middleIndex < sortedArray.length - 1) {
      const rightArray = sortedArray.slice(middleIndex + 1);
      rootNode.right = buildTree(rightArray);
    }
  
    return rootNode;
  }
  
  const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
  
  function height(node) {
    if (!node) {
      return -1;
    }
  
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);
  
    return 1 + Math.max(leftHeight, rightHeight);
  }
  
  function depth(node) {
    if (!node.parent) {
      return 0;
    }
  
    return 1 + depth(node.parent);
  }
  
  function isBalanced(node) {
    if (!node) {
      return true;
    }
  
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);
  
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }
  
    return isBalanced(node.left) && isBalanced(node.right);
  }
  
  const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
  prettyPrint(tree.root);
  
  console.log("Tree is balance: ", isBalanced(tree.root));
  console.log("Height: ", height(tree.root));
  console.log("Printing each node data value in Level Order \n");
  tree.levelOrder((node) => console.log(node.data));
  console.log("Printing each node data value in Inorder \n");
  tree.inorder((node) => console.log(node.data));
  console.log("Printing each node data value in Preorder \n");
  tree.preorder((node) => console.log(node.data));
  
  console.log("Printing each node data value in Postorder \n");
  tree.postorder((node) => console.log(node.data));
  
  
  tree.insert(10);
  tree.delete(7);
  console.log("After Insert (10) and Delete (7) ");
  prettyPrint(tree.root);
  
  console.log("After Insert & Delete, Tree is balance: ", isBalanced(tree.root));
  
  const node = tree.find(5);
  console.log("find 5 Value", node);
  
  console.log("Printing each node data value in Level Order After Insert & Delete Node \n");
  console.log("Level Order: ");
  tree.levelOrder((node) => console.log(node.data));
  
  const values = tree.levelOrder();
  
  console.log("Printing each node data value in  Inorder After Insert & Delete Node \n");
  tree.inorder((node) => console.log(node.data));
  
  console.log("Printing each node data value in Preorder After Insert & Delete Node \n");
  tree.preorder((node) => console.log(node.data));
  
  console.log("Printing each node data value in PostOrder After Insert & Delete Node \n");
  tree.postorder((node) => console.log(node.data));
  
  const rootNode = tree.root;
  
  console.log("Height after Insert & Delete Node: ", height(rootNode));
  console.log("Depth after Insert & Delete Node: ", depth(rootNode.right.right));
  
  // console.log(tree.rebalance());
  
  
  