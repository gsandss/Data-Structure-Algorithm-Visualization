export const linearStructures = {
    array: {
        name: "Array",
        description: "An array is a fundamental and linear data structure that stores items at contiguous locations. Note that in case of C/C++ and Java-Primitive-Arrays, actual elements are stored at contiguous locations. And in case of Python, JS, Java-Non-Primitive, references are stored at contiguous locations. It offers mainly the following advantages over other data structures."
    },

    stack: {
        name: "Stack",
        description: "A Stack is a linear data structure that follows a particular order in which the operations are performed. The order may be LIFO(Last In First Out) or FILO(First In Last Out). LIFO implies that the element that is inserted last, comes out first and FILO implies that the element that is inserted first, comes out last. t behaves like a stack of plates, where the last plate added is the first one to be removed. Think of it this way:Pushing an element onto the stack is like adding a new plate on top.Popping an element removes the top plate from the stack. "
    },

    linkedList: {
        name: "Linked List",
        description: "A linked list is a fundamental data structure in computer science. It mainly allows efficient insertion and deletion operations compared to arrays. Like arrays, it is also used to implement other data structures like stack, queue and deque. A linked list is a type of linear data structure individual items are not necessarily at contiguous locations. The individual items are called nodes and connected with each other using links."
    },

    queue: {
        name: "Queue",
        description: "A Queue Data Structure is a fundamental concept in computer science used for storing and managing data in a specific order. It follows the principle of First in, First out(FIFO), where the first element added to the queue is the first one to be removed. It is used as a buffer in computer systems where we have speed mismatch between two devices that communicate with each other. For example, CPU and keyboard and two devices in a network Queue is also used in Operating System algorithms like CPU Scheduling and Memory Management, and many standard algorithms like Breadth First Search of Graph, Level Order Traversal of a Tree."
    },
};