import { WordEntry } from '../types/game';

export const FIVE_LETTER_REGEX = /^[A-Z]{5}$/;

export function isStrictly5LetterWord(word: string): boolean {
  return FIVE_LETTER_REGEX.test(word.toUpperCase().trim());
}

// STRICT REQUIREMENT: Every single computer science word MUST match ^[A-Z]{5}$
export const CS_WORDS: WordEntry[] = [
  // --- PYTHON & PROGRAMMING (Strictly 5 Letters) ---
  {
    word: 'CLASS',
    length: 5,
    difficulty: 'easy',
    category: 'Python',
    hints: [
      'Category: Object-Oriented Programming (OOP) in Python.',
      'Purpose: Serves as a user-defined blueprint from which individual objects are instantiated.',
      'Syntax: Defined with the "class" keyword; initializes state using the __init__() constructor.',
      'Letter Clue: 5 letters, starts with "C", ends with double "S".'
    ],
    definition: 'An extensible code template for creating objects, defining their attributes and behaviors.',
    example: 'class Student:\n    def __init__(self, roll):\n        self.roll = roll',
    examTip: 'The __init__ method is Python’s constructor function automatically called during object creation.'
  },
  {
    word: 'ARRAY',
    length: 5,
    difficulty: 'easy',
    category: 'Data Structures',
    hints: [
      'Category: Linear Data Structures.',
      'Purpose: Stores multiple elements of the same type at contiguous memory locations.',
      'Advantage: Provides rapid O(1) random access using numerical index offsets.',
      'Letter Clue: 5 letters, starts and ends with vowels ("A" and "Y"), contains double "R".'
    ],
    definition: 'A linear data structure consisting of a collection of elements stored at contiguous memory locations.',
    example: 'import array\nnums = array.array("i", [10, 20, 30])',
    examTip: 'Address calculation formula: Address(A[i]) = BaseAddress + (i - LowerBound) * Size.'
  },
  {
    word: 'STACK',
    length: 5,
    difficulty: 'easy',
    category: 'Data Structures',
    hints: [
      'Category: Restricted Linear Data Structures.',
      'Principle: Operates strictly on the LIFO (Last In First Out) discipline.',
      'Operations: Additions and deletions take place exclusively at one end called the TOP.',
      'Letter Clue: 5 letters, starts with "S", ends with "K", contains "T", "A", "C".'
    ],
    definition: 'A linear list where insertion and deletion occur exclusively at the top end (LIFO).',
    example: 'stack = []\nstack.append(10) # PUSH\ntop = stack.pop() # POP',
    examTip: 'Underflow occurs when attempting to pop from an empty stack; Overflow when pushing into a full stack.'
  },
  {
    word: 'QUEUE',
    length: 5,
    difficulty: 'easy',
    category: 'Data Structures',
    hints: [
      'Category: Linear Data Structures.',
      'Principle: Operates strictly on the FIFO (First In First Out) discipline.',
      'Structure: Items enter at the REAR end and exit from the FRONT end.',
      'Letter Clue: 5 letters, starts with "Q", contains four vowels (two "U"s and two "E"s).'
    ],
    definition: 'A linear data structure in which insertions happen at the rear and deletions at the front.',
    example: 'from collections import deque\nq = deque()\nq.append("Job1") # Enqueue\nq.popleft()      # Dequeue',
    examTip: 'FIFO ordering is used in CPU task scheduling, print queues, and breadth-first search (BFS).'
  },
  {
    word: 'DEBUG',
    length: 5,
    difficulty: 'easy',
    category: 'Operating Systems & Software',
    hints: [
      'Category: Software Development & Quality Assurance.',
      'Purpose: The process of finding, analyzing, and removing defects or bugs in computer code.',
      'Techniques: Involves breakpoints, step execution, variable inspection, and logging.',
      'Letter Clue: 5 letters, starts with "D", ends with "G", contains "E", "B", "U".'
    ],
    definition: 'The systematic routine of detecting and fixing errors or unexpected behaviors in software.',
    example: 'import pdb; pdb.set_trace() # Python built-in debugger',
    examTip: 'Syntax errors are caught during parsing; Logical errors compile fine but produce wrong results.'
  },
  {
    word: 'LOGIC',
    length: 5,
    difficulty: 'easy',
    category: 'Computer Fundamentals',
    hints: [
      'Category: Boolean Algebra & Digital Circuits.',
      'Principle: The mathematical reasoning that governs binary decisions (True/False).',
      'Gates: Implemented via fundamental hardware gates: AND, OR, NOT, NAND, NOR, XOR.',
      'Letter Clue: 5 letters, starts with "L", ends with "C", contains "O", "G", "I".'
    ],
    definition: 'The formal reasoning system and binary gate architecture that dictates computational truth values.',
    example: 'Truth Table: AND gate outputs 1 only if both input A and B are 1.',
    examTip: 'NAND and NOR gates are known as Universal Gates because any logic circuit can be built with them.'
  },
  {
    word: 'PIXEL',
    length: 5,
    difficulty: 'easy',
    category: 'Hardware & Architecture',
    hints: [
      'Category: Graphics Hardware & Display Architecture.',
      'Portmanteau: Derived from "Picture Element".',
      'Role: The smallest addressable, illuminated point of color on a display screen.',
      'Letter Clue: 5 letters, starts with "P", ends with "L", contains "I", "X", "E".'
    ],
    definition: 'The smallest physical or digital point of raster color on a display screen or digital image.',
    example: 'Resolution 1920x1080 means 1920 horizontal pixels by 1080 vertical pixels.',
    examTip: 'Display resolution is measured in total horizontal pixels multiplied by vertical pixels.'
  },
  {
    word: 'CACHE',
    length: 5,
    difficulty: 'medium',
    category: 'Hardware & Architecture',
    hints: [
      'Category: High-Speed Memory Architecture.',
      'Placement: Ultra-fast SRAM buffer positioned between the CPU and main RAM.',
      'Principle: Exploits temporal and spatial locality of reference to accelerate instructions.',
      'Letter Clue: 5 letters, starts with "C", ends with "E", contains two "C"s ("C-A-C-H-E").'
    ],
    definition: 'An auxiliary high-speed memory area providing near-instant access to frequently used instructions.',
    example: 'L1/L2/L3 caches built directly on processor dies.',
    examTip: 'Cache hits deliver instructions in nanoseconds; Cache misses require fetching from slower RAM.'
  },
  {
    word: 'ROUTE',
    length: 5,
    difficulty: 'medium',
    category: 'Computer Networks',
    hints: [
      'Category: Network Layer & Packet Forwarding.',
      'Concept: The selected sequence of hops data packets take from source to destination.',
      'Calculation: Determined dynamically using routing tables and metrics like hop count and latency.',
      'Letter Clue: 5 letters, starts with "R", ends with "E", contains "O", "U", "T".'
    ],
    definition: 'The specific path or sequence of network intermediate nodes that packets traverse across networks.',
    example: 'Traceroute tool inspects every router hop between client and host.',
    examTip: 'Routers maintain a Routing Table to decide the optimal next hop destination for incoming packets.'
  },
  {
    word: 'TABLE',
    length: 5,
    difficulty: 'easy',
    category: 'Database & SQL',
    hints: [
      'Category: Relational Database Management Systems (RDBMS).',
      'Purpose: Organizes structured data in a 2D matrix of columns and rows.',
      'Relational Algebra: Formally termed a "Relation"; rows are tuples, columns are attributes.',
      'Letter Clue: 5 letters, begins with "T", ends with "E", contains "A", "B", "L".'
    ],
    definition: 'The fundamental storage structure of a relational database consisting of vertical columns and horizontal rows.',
    example: 'CREATE TABLE Student (\n  RollNo INT PRIMARY KEY,\n  Name VARCHAR(50)\n);',
    examTip: 'Degree is the total number of columns; Cardinality is the total number of rows.'
  },
  {
    word: 'QUERY',
    length: 5,
    difficulty: 'easy',
    category: 'Database & SQL',
    hints: [
      'Category: SQL & Database Manipulation.',
      'Purpose: An instruction or request issued to retrieve or filter data from database tables.',
      'Syntax: Built primarily using SELECT, FROM, WHERE, and JOIN statements.',
      'Letter Clue: 5 letters, starts with "Q", contains "U", "E", "R", and ends with "Y".'
    ],
    definition: 'A formal command or request sent to a database engine to inspect, filter, or manipulate data.',
    example: 'SELECT Name, Marks FROM Student WHERE Marks >= 90;',
    examTip: 'DQL (Data Query Language) specifically refers to the SELECT statement.'
  },
  {
    word: 'FLOAT',
    length: 5,
    difficulty: 'easy',
    category: 'Python',
    hints: [
      'Category: Python Numeric Data Types.',
      'Format: Represents real numbers containing fractional decimal parts.',
      'Arithmetic: Division with a single slash "/" always yields this data type.',
      'Letter Clue: 5 letters, starts with "F", ends with "T", contains "L", "O", "A".'
    ],
    definition: 'A fundamental numerical data type used to represent real numbers with fractional decimal points.',
    example: 'pi = 3.14159\nprint(type(10 / 2)) # <class "float">',
    examTip: 'Division / produces float, floor division // produces integer.'
  },
  {
    word: 'TUPLE',
    length: 5,
    difficulty: 'easy',
    category: 'Python',
    hints: [
      'Category: Python Built-in Sequences.',
      'Immutability: An ordered collection that cannot be modified after creation.',
      'Notation: Delimited by round parentheses (); elements separated by commas.',
      'Letter Clue: 5 letters, starts with "T", ends with "E", contains "U", "P", "L".'
    ],
    definition: 'An immutable sequence of heterogeneous Python objects enclosed in round parentheses ().',
    example: 'point = (10, 20)\n# point[0] = 30 causes TypeError',
    examTip: 'Single-element tuple requires a trailing comma: t = (5,).'
  },
  {
    word: 'WHILE',
    length: 5,
    difficulty: 'easy',
    category: 'Python',
    hints: [
      'Category: Python Control Flow Constructs.',
      'Purpose: Repeats a block of code as long as a test condition evaluates to True.',
      'Caution: If the loop counter never updates to False, an infinite loop occurs.',
      'Letter Clue: 5 letters, starts with "W", ends with "E", contains "H", "I", "L".'
    ],
    definition: 'A control flow statement that executes code repeatedly based on a boolean condition.',
    example: 'count = 3\nwhile count > 0:\n    print(count)\n    count -= 1',
    examTip: 'Always ensure the loop variable is updated within the while body to avoid infinite execution.'
  },
  {
    word: 'BREAK',
    length: 5,
    difficulty: 'easy',
    category: 'Python',
    hints: [
      'Category: Loop Control Statements.',
      'Action: Immediately terminates the innermost loop and jumps to the code following it.',
      'Behavior: When triggered, the loop’s "else" clause (if present) is bypassed.',
      'Letter Clue: 5 letters, starts with "B", ends with "K", contains "R", "E", "A".'
    ],
    definition: 'A loop control keyword used to exit prematurely from for or while loops.',
    example: 'for i in range(10):\n    if i == 5:\n        break # Exits loop early',
    examTip: 'When break executes inside a loop, the loop’s "else" clause is NOT executed.'
  },
  {
    word: 'YIELD',
    length: 5,
    difficulty: 'hard',
    category: 'Python',
    hints: [
      'Category: Advanced Python Functions & Generators.',
      'Role: Pauses execution of a function and produces a value to the caller without terminating.',
      'Advantage: Produces lazy evaluations, saving memory when dealing with large datasets.',
      'Letter Clue: 5 letters, starts with "Y", ends with "D", contains "I", "E", "L".'
    ],
    definition: 'A Python keyword that turns a regular function into a generator yielding values lazily.',
    example: 'def counter():\n    yield 1\n    yield 2\ngen = counter()',
    examTip: 'Generators save memory by evaluating one value at a time on demand (lazy evaluation).'
  },
  {
    word: 'SLICE',
    length: 5,
    difficulty: 'medium',
    category: 'Python',
    hints: [
      'Category: Sequence Indexing & Extraction.',
      'Syntax: Uses square brackets with colons: [start:stop:step].',
      'Boundary: The stop boundary index is non-inclusive.',
      'Letter Clue: 5 letters, starts with "S", ends with "E", contains "L", "I", "C".'
    ],
    definition: 'A mechanism to retrieve a contiguous sub-range from an ordered sequence like a string or list.',
    example: 'text = "COMPUTER"\nprint(text[0:4]) # "COMP"',
    examTip: 'Step argument can be negative to traverse sequences backwards (e.g. [::-1]).'
  },
  {
    word: 'RANGE',
    length: 5,
    difficulty: 'easy',
    category: 'Python',
    hints: [
      'Category: Built-in Python Sequences.',
      'Purpose: Produces an arithmetic progression of integers, commonly used with for-loops.',
      'Parameters: Accepts start, stop, and optional step arguments.',
      'Letter Clue: 5 letters, starts with "R", ends with "E", contains "A", "N", "G".'
    ],
    definition: 'An immutable sequence type representing an arithmetic progression of integers.',
    example: 'for num in range(1, 6, 2):\n    print(num) # 1, 3, 5',
    examTip: 'range(5) produces 0, 1, 2, 3, 4. The upper boundary is never included.'
  },
  {
    word: 'PRINT',
    length: 5,
    difficulty: 'easy',
    category: 'Python',
    hints: [
      'Category: Standard Console Output.',
      'Function: Built-in Python function that outputs strings and expressions to stdout.',
      'Keyword arguments: Supports "sep" for item separators and "end" for line endings.',
      'Letter Clue: 5 letters, starts with "P", ends with "T", contains "R", "I", "N".'
    ],
    definition: 'A built-in function used in Python to display variables and expressions on the screen.',
    example: 'print("Sum =", 50, sep=":", end="!\\n")',
    examTip: 'Frequent CBSE board question: predict the output of print() with custom sep and end parameters.'
  },
  {
    word: 'INPUT',
    length: 5,
    difficulty: 'easy',
    category: 'Python',
    hints: [
      'Category: Standard Console Input.',
      'Function: Halts execution to read a line of text entered from the user keyboard.',
      'Return Type: Always returns data as a string (str); requires explicit casting.',
      'Letter Clue: 5 letters, starts with "I", ends with "T", contains "N", "P", "U".'
    ],
    definition: 'A Python built-in function that pauses program execution to receive input from the user.',
    example: 'age = int(input("Enter age: "))',
    examTip: 'input() always returns a string. For numeric calculations, always cast with int() or float().'
  },
  {
    word: 'SCOPE',
    length: 5,
    difficulty: 'medium',
    category: 'Python',
    hints: [
      'Category: Variable Visibility & Namespaces.',
      'Hierarchy: Governed in Python by the LEGB rule: Local, Enclosing, Global, Built-in.',
      'Lifetime: Dictates where in a program an identifier can be referenced or modified.',
      'Letter Clue: 5 letters, starts with "S", ends with "E", contains "C", "O", "P".'
    ],
    definition: 'The structural region of a program where a specific variable or function is accessible.',
    example: 'x = 10 # Global\ndef fn():\n    x = 5 # Local to fn',
    examTip: 'Use the "global" keyword inside a function if you intend to reassign a global variable.'
  },
  {
    word: 'PARAM',
    length: 5,
    difficulty: 'medium',
    category: 'Python',
    hints: [
      'Category: Function Declarations.',
      'Definition: A variable declared in a function definition signature to receive incoming values.',
      'Distinction: Parameters belong to the def header; arguments are the passed values.',
      'Letter Clue: 5 letters, starts with "P", ends with "M", contains "A", "R", "A".'
    ],
    definition: 'A placeholder identifier declared in a function signature to accept incoming arguments.',
    example: 'def add(a, b): # a, b are parameters\n    return a + b',
    examTip: 'Parameters are variables in the function header; arguments are actual values passed during call.'
  },
  {
    word: 'VALUE',
    length: 5,
    difficulty: 'easy',
    category: 'Python',
    hints: [
      'Category: Data Representation & Dictionaries.',
      'Role: The actual datum associated with a variable or mapped to a dictionary key.',
      'Retrieval: Extracted from dictionaries using dict[key] or dict.values().',
      'Letter Clue: 5 letters, starts with "V", ends with "E", contains "A", "L", "U".'
    ],
    definition: 'A concrete piece of data, evaluated expression, or object stored in memory.',
    example: 'marks = {"CS": 98}\nprint(marks["CS"]) # 98 is the value',
    examTip: 'Dictionary values can be duplicated and mutable, but dictionary keys must be unique and immutable.'
  },
  {
    word: 'SUPER',
    length: 5,
    difficulty: 'hard',
    category: 'Python',
    hints: [
      'Category: Object-Oriented Programming (OOP) Inheritance.',
      'Purpose: Built-in proxy object that delegates method calls to a parent or superclass.',
      'Usage: Frequently used in subclass __init__() to invoke base class initializers.',
      'Letter Clue: 5 letters, starts with "S", ends with "R", contains "U", "P", "E".'
    ],
    definition: 'A built-in helper used in OOP inheritance to access methods belonging to the parent class.',
    example: 'class Child(Parent):\n    def __init__(self):\n        super().__init__()',
    examTip: 'Essential in multiple inheritance for proper Method Resolution Order (MRO).'
  },
  {
    word: 'ASYNC',
    length: 5,
    difficulty: 'hard',
    category: 'Python',
    hints: [
      'Category: Asynchronous Concurrency.',
      'Keyword: Prefixed to "def" to define a non-blocking coroutine function.',
      'Execution: Managed cooperatively by an event loop (asyncio.run()).',
      'Letter Clue: 5 letters, starts with "A", ends with "C", contains "S", "Y", "N".'
    ],
    definition: 'A syntax keyword indicating asynchronous execution managed by an event loop.',
    example: 'async def fetch_data():\n    return "data"',
    examTip: 'Asynchronous coroutines require an event loop (asyncio.run()) to execute.'
  },
  {
    word: 'AWAIT',
    length: 5,
    difficulty: 'hard',
    category: 'Python',
    hints: [
      'Category: Asynchronous Concurrency.',
      'Keyword: Pauses coroutine execution until an awaitable task or future resolves.',
      'Constraint: Can only be called within functions declared with async def.',
      'Letter Clue: 5 letters, starts with "A", ends with "T", contains "W", "A", "I".'
    ],
    definition: 'A keyword that yields execution until an awaitable object resolves its result.',
    example: 'response = await fetch_data()',
    examTip: 'The await expression can only be used inside a function declared with async def.'
  },
  {
    word: 'RAISE',
    length: 5,
    difficulty: 'medium',
    category: 'Python',
    hints: [
      'Category: Exception Handling.',
      'Purpose: Explicitly triggers an exception or error condition in program code.',
      'Pairing: Used with built-in exceptions like ValueError, TypeError, or ZeroDivisionError.',
      'Letter Clue: 5 letters, starts with "R", ends with "E", contains "A", "I", "S".'
    ],
    definition: 'A statement used to manually trigger and throw an exception during program flow.',
    example: 'if age < 0:\n    raise ValueError("Age cannot be negative")',
    examTip: 'In CBSE practicals: custom exception handling uses try, except, else, finally, and raise.'
  },
  {
    word: 'GRAPH',
    length: 5,
    difficulty: 'medium',
    category: 'Data Structures',
    hints: [
      'Category: Non-linear Data Structures.',
      'Components: A collection of Vertices (V) connected by Edges (E).',
      'Traversal: Explored systematically using Breadth-First Search (BFS) or Depth-First Search (DFS).',
      'Letter Clue: 5 letters, starts with "G", ends with "H", contains "R", "A", "P".'
    ],
    definition: 'A non-linear data structure comprising a set of vertices interconnected by edges.',
    example: 'G = { "A": ["B", "C"], "B": ["A"] } # Adjacency list',
    examTip: 'A tree is simply a connected, undirected graph with no cycles.'
  },
  {
    word: 'NODES',
    length: 5,
    difficulty: 'medium',
    category: 'Data Structures',
    hints: [
      'Category: Data Structures & Network Topologies.',
      'Plural form: The individual interconnected data points in lists, trees, or networks.',
      'Encapsulation: Each unit carries payload data plus pointers or links to neighbors.',
      'Letter Clue: 5 letters, starts with "N", ends with "S", contains "O", "D", "E".'
    ],
    definition: 'The fundamental discrete elements that make up non-contiguous data structures.',
    example: 'class Node:\n    def __init__(self, val):\n        self.data = val\n        self.next = None',
    examTip: 'In networks, any device attached to the communication medium is also called a node.'
  },
  {
    word: 'TREES',
    length: 5,
    difficulty: 'medium',
    category: 'Data Structures',
    hints: [
      'Category: Non-linear Data Structures.',
      'Structure: Hierarchical collections of parent and child nodes starting from a single Root.',
      'Binary form: Each parent node possesses at most two child branches (left and right).',
      'Letter Clue: 5 letters, starts with "T", ends with "S", contains "R", double "E".'
    ],
    definition: 'Non-linear hierarchical data structures consisting of parent and child nodes without cycles.',
    example: 'Root -> Subtree Left & Subtree Right',
    examTip: 'Binary Search Trees (BST): Left child < Parent < Right child.'
  },
  {
    word: 'HEAPS',
    length: 5,
    difficulty: 'hard',
    category: 'Data Structures',
    hints: [
      'Category: Tree-based Priority Structures.',
      'Properties: Complete binary trees satisfying max-heap or min-heap ordering.',
      'Use Case: Serves as the efficient foundation for Priority Queues and Heap Sort.',
      'Letter Clue: 5 letters, starts with "H", ends with "S", contains "E", "A", "P".'
    ],
    definition: 'Specialized complete binary tree structures maintaining parent-child min or max order.',
    example: 'import heapq\nh = [20, 10, 30]\nheapq.heapify(h)',
    examTip: 'Heap Sort achieves guaranteed O(n log n) worst-case time complexity.'
  },
  {
    word: 'INDEX',
    length: 5,
    difficulty: 'medium',
    category: 'Database & SQL',
    hints: [
      'Category: Database Performance Optimization.',
      'Structure: A fast B-Tree lookup structure created on table columns.',
      'Benefit: Avoids full-table linear scans to dramatically speed up SELECT queries.',
      'Letter Clue: 5 letters, starts with "I", ends with "X", contains "N", "D", "E".'
    ],
    definition: 'A performance lookup structure created on database columns to accelerate record retrieval.',
    example: 'CREATE INDEX idx_roll ON Student(RollNo);',
    examTip: 'Primary keys are automatically indexed by default in almost all relational engines.'
  },
  {
    word: 'COUNT',
    length: 5,
    difficulty: 'easy',
    category: 'Database & SQL',
    hints: [
      'Category: SQL Aggregate Functions.',
      'Purpose: Returns the total number of rows matching the query condition.',
      'Difference: COUNT(*) tallies all rows; COUNT(col) excludes NULL values.',
      'Letter Clue: 5 letters, starts with "C", ends with "T", contains "O", "U", "N".'
    ],
    definition: 'An aggregate SQL function that returns the numeric tally of rows returned by a query.',
    example: 'SELECT COUNT(*) FROM Student WHERE Stream = "CS";',
    examTip: 'COUNT(*) includes NULL rows, but COUNT(column_name) ignores NULLs.'
  },
  {
    word: 'ORDER',
    length: 5,
    difficulty: 'easy',
    category: 'Database & SQL',
    hints: [
      'Category: SQL Query Clauses.',
      'Paired with: Used alongside "BY" to sort the result-set in ASC or DESC order.',
      'Placement: Placed at the very end of a SELECT query statement.',
      'Letter Clue: 5 letters, starts with "O", ends with "R", contains "R", "D", "E".'
    ],
    definition: 'A SQL clause used to specify the sort criteria and direction of query results.',
    example: 'SELECT * FROM Books ORDER BY Price DESC;',
    examTip: 'If ASC or DESC is omitted in ORDER BY, SQL defaults to ASC (ascending).'
  },
  {
    word: 'GROUP',
    length: 5,
    difficulty: 'medium',
    category: 'Database & SQL',
    hints: [
      'Category: SQL Data Aggregation.',
      'Paired with: Used alongside "BY" to collapse identical data across rows into summary groups.',
      'Companion: Filtered with the HAVING clause, never with WHERE.',
      'Letter Clue: 5 letters, starts with "G", ends with "P", contains "R", "O", "U".'
    ],
    definition: 'A clause that aggregates rows sharing the same values in specified columns.',
    example: 'SELECT Department, COUNT(*) FROM Employee GROUP BY Department;',
    examTip: 'To filter grouped aggregated results, use the HAVING clause, never WHERE.'
  },
  {
    word: 'WHERE',
    length: 5,
    difficulty: 'easy',
    category: 'Database & SQL',
    hints: [
      'Category: SQL Record Filtering.',
      'Purpose: Filters individual table rows based on a boolean criteria before grouping.',
      'Operators: Evaluated with =, <>, BETWEEN, LIKE, IN, AND, OR, NOT.',
      'Letter Clue: 5 letters, starts with "W", ends with "E", contains "H", "E", "R".'
    ],
    definition: 'A filtering clause in SQL that specifies criteria rows must satisfy to be selected or updated.',
    example: 'SELECT * FROM Student WHERE Marks BETWEEN 80 AND 100;',
    examTip: 'WHERE filters individual table rows; HAVING filters grouped aggregate rows.'
  },
  {
    word: 'UNION',
    length: 5,
    difficulty: 'medium',
    category: 'Database & SQL',
    hints: [
      'Category: Relational Set Operators.',
      'Operation: Combines the result-sets of two SELECT queries and removes duplicates.',
      'Compatibility: Both queries must possess matching numbers and types of columns.',
      'Letter Clue: 5 letters, starts with "U", ends with "N", contains "N", "I", "O".'
    ],
    definition: 'A relational operator that merges records from two queries with compatible schemas.',
    example: 'SELECT City FROM Customers UNION SELECT City FROM Suppliers;',
    examTip: 'Both queries participating in a UNION must possess the exact same number and type of columns.'
  },
  {
    word: 'FIELD',
    length: 5,
    difficulty: 'easy',
    category: 'Database & SQL',
    hints: [
      'Category: Relational Data Structures.',
      'Synonyms: Also known as an Attribute or Column in relational terminology.',
      'Role: Contains a specific category of data across all records in a table.',
      'Letter Clue: 5 letters, starts with "F", ends with "D", contains "I", "E", "L".'
    ],
    definition: 'A vertical division of a relational table containing a single piece of information for each record.',
    example: 'Fields in Student table: AdmNo, Name, DOB, TotalMarks',
    examTip: 'In relational database terminology: Column = Attribute = Field; Row = Tuple = Record.'
  },
  {
    word: 'ALIAS',
    length: 5,
    difficulty: 'medium',
    category: 'Database & SQL',
    hints: [
      'Category: SQL Query Syntax.',
      'Keyword: Assigned using the "AS" keyword to give temporary names to columns or tables.',
      'Utility: Makes output headers user-friendly and simplifies self-joins.',
      'Letter Clue: 5 letters, starts with "A", ends with "S", contains "L", "I", "A".'
    ],
    definition: 'A temporary shorthand identifier assigned to a table or column for the duration of a query.',
    example: 'SELECT AVG(Score) AS AverageScore FROM Exam;',
    examTip: 'The "AS" keyword is optional in many SQL dialects: "SELECT Marks M FROM Test".'
  },
  {
    word: 'MODEM',
    length: 5,
    difficulty: 'easy',
    category: 'Computer Networks',
    hints: [
      'Category: Network Interface Hardware.',
      'Portmanteau: Modulator-Demodulator.',
      'Role: Converts digital computer signals to analog carrier signals and vice-versa.',
      'Letter Clue: 5 letters, starts with "M", ends with "M", contains "O", "D", "E".'
    ],
    definition: 'A network device that modulates analog carrier signals to encode digital information and demodulates them.',
    example: 'PC (Digital) <-> Modem (Analog Cable) <-> ISP',
    examTip: 'Modulation = Digital to Analog; Demodulation = Analog to Digital.'
  },
  {
    word: 'CABLE',
    length: 5,
    difficulty: 'easy',
    category: 'Computer Networks',
    hints: [
      'Category: Guided Transmission Media.',
      'Types: Includes Twisted-Pair (UTP/STP), Coaxial, and Fiber-Optic varieties.',
      'Role: Physical wiring carrying electrical currents or light pulses between devices.',
      'Letter Clue: 5 letters, starts with "C", ends with "E", contains "A", "B", "L".'
    ],
    definition: 'A physical guided conduit carrying electrical or optical communication signals between devices.',
    example: 'CAT-6 Ethernet cable with RJ-45 connector connecting PC to switch.',
    examTip: 'Fiber optic cables offer the highest bandwidth and immune to electromagnetic interference (EMI).'
  },
  {
    word: 'FIBER',
    length: 5,
    difficulty: 'medium',
    category: 'Computer Networks',
    hints: [
      'Category: High-Speed Transmission Media.',
      'Physics: Operates via Total Internal Reflection (TIR) of light pulses inside glass cores.',
      'Advantages: Massive bandwidth, extreme distances, and complete immunity to EMI.',
      'Letter Clue: 5 letters, starts with "F", ends with "R", contains "I", "B", "E".'
    ],
    definition: 'A high-speed physical transmission medium utilizing light signals through glass or plastic cores.',
    example: 'Fiber-to-the-Home (FTTH) broadband delivering gigabit bandwidth.',
    examTip: 'Physical principle behind fiber optics is Total Internal Reflection (TIR).'
  },
  {
    word: 'RADIO',
    length: 5,
    difficulty: 'medium',
    category: 'Computer Networks',
    hints: [
      'Category: Unguided Wireless Media.',
      'Propagation: Omnidirectional waves spanning 3 kHz to 300 GHz that penetrate building walls.',
      'Applications: Powers Wi-Fi, Bluetooth, and cellular cellular communications.',
      'Letter Clue: 5 letters, starts with "R", ends with "O", contains "A", "D", "I".'
    ],
    definition: 'An unguided electromagnetic transmission wave used for wireless broadcast communications.',
    example: 'Wi-Fi 802.11 transmissions broadcasting on 2.4 GHz and 5 GHz bands.',
    examTip: 'Radio waves are omnidirectional; Microwaves are unidirectional (line-of-sight).'
  },
  {
    word: 'MEDIA',
    length: 5,
    difficulty: 'easy',
    category: 'Computer Networks',
    hints: [
      'Category: Network Communication Pathways.',
      'Classification: Guided (wired cables) vs Unguided (wireless radio/microwaves).',
      'Function: The physical or atmospheric channel carrying data between network nodes.',
      'Letter Clue: 5 letters, starts with "M", ends with "A", contains "E", "D", "I".'
    ],
    definition: 'The physical or atmospheric communication channels used to transmit data across a network.',
    example: 'Guided Media (Wired) vs Unguided Media (Wireless)',
    examTip: 'Common board question: classify given transmission channels into guided and unguided.'
  },
  {
    word: 'LAYER',
    length: 5,
    difficulty: 'easy',
    category: 'Computer Networks',
    hints: [
      'Category: Network Protocol Architectures.',
      'Models: Form the divisions of the 7-layer OSI model and 4-layer TCP/IP suite.',
      'Principle: Each level provides services to the level above and relies on the level below.',
      'Letter Clue: 5 letters, starts with "L", ends with "R", contains "A", "Y", "E".'
    ],
    definition: 'A modular division of network protocols responsible for specific communication functions.',
    example: 'OSI Model: Physical, Data Link, Network, Transport, Session, Presentation, Application.',
    examTip: 'TCP/IP Model layers: Network Interface, Internet (IP), Transport (TCP/UDP), Application.'
  },
  {
    word: 'OCTET',
    length: 5,
    difficulty: 'hard',
    category: 'Computer Networks',
    hints: [
      'Category: IP Addressing & Networking Math.',
      'Size: Exactly 8 bits (1 byte) in networking contexts.',
      'IPv4: An IPv4 address is divided into 4 of these, separated by dots (e.g. 192.168.1.1).',
      'Letter Clue: 5 letters, starts with "O", ends with "T", contains two "T"s ("O-C-T-E-T").'
    ],
    definition: 'A unit of digital information consisting of precisely eight bits, commonly in networking contexts.',
    example: 'IPv4: 192 . 168 . 1 . 1 (4 octets = 32 bits total)',
    examTip: 'Each octet in IPv4 ranges in decimal value from 0 to 255 (2^8 = 256 possibilities).'
  },
  {
    word: 'VIRUS',
    length: 5,
    difficulty: 'easy',
    category: 'Cybersecurity',
    hints: [
      'Category: Malicious Software & Cybersecurity.',
      'Acronym: Vital Information Resources Under Siege.',
      'Characteristics: Requires a host executable file and user execution to replicate and spread.',
      'Letter Clue: 5 letters, starts with "V", ends with "S", contains "I", "R", "U".'
    ],
    definition: 'A self-replicating malicious program that modifies host files to execute harmful payloads.',
    example: 'Infects application files and damages file tables or corrupts user files.',
    examTip: 'Unlike worms that self-propagate across networks, viruses require human action to execute host files.'
  },
  {
    word: 'CYBER',
    length: 5,
    difficulty: 'easy',
    category: 'Cybersecurity',
    hints: [
      'Category: Digital Law & Information Security.',
      'Prefix: Pertains to computers, cyberspace, the internet, and virtual reality.',
      'Legal: Governed in India by the Information Technology Act (IT Act 2000).',
      'Letter Clue: 5 letters, starts with "C", ends with "R", contains "Y", "B", "E".'
    ],
    definition: 'Relating to computers, information technology, virtual reality, and online digital networks.',
    example: 'Cyber laws in India are regulated under the Information Technology Act (IT Act 2000).',
    examTip: 'Section 66F of IT Act addresses punishment for cyber terrorism.'
  },
  {
    word: 'PROXY',
    length: 5,
    difficulty: 'medium',
    category: 'Cybersecurity',
    hints: [
      'Category: Gateway Security & Anonymity.',
      'Role: An intermediary server that evaluates client requests before forwarding them to destinations.',
      'Utility: Provides IP masking, website caching, and content filtering in educational institutions.',
      'Letter Clue: 5 letters, starts with "P", ends with "Y", contains "R", "O", "X".'
    ],
    definition: 'A gateway server separating end-user clients from the internet destinations they browse.',
    example: 'School lab proxy blocking unauthorized domains and caching frequent web pages.',
    examTip: 'Proxy servers enhance security and performance by caching responses and hiding private IP addresses.'
  },
  {
    word: 'PATCH',
    length: 5,
    difficulty: 'medium',
    category: 'Cybersecurity',
    hints: [
      'Category: System Maintenance & Vulnerability Defense.',
      'Function: A quick software update released by vendors to resolve bugs and security vulnerabilities.',
      'Defense: Critical for preventing exploits of known Zero-Day security flaws.',
      'Letter Clue: 5 letters, starts with "P", ends with "H", contains "A", "T", "C".'
    ],
    definition: 'A piece of software designed to update a computer program to fix vulnerabilities or improve stability.',
    example: 'Installing OS security patches prevents malware from exploiting known system backdoors.',
    examTip: 'Unpatched software is one of the leading vectors for malware infiltration.'
  },
  {
    word: 'ALERT',
    length: 5,
    difficulty: 'easy',
    category: 'Cybersecurity',
    hints: [
      'Category: Intrusion Detection & System Warnings.',
      'Trigger: Raised when suspicious traffic or unauthorized activity violates security policies.',
      'Generated by: Firewalls, Antivirus engines, and Intrusion Detection Systems (IDS).',
      'Letter Clue: 5 letters, starts with "A", ends with "T", contains "L", "E", "R".'
    ],
    definition: 'A warning message signaling potential security violations, malware detections, or system anomalies.',
    example: 'Firewall Alert: Unauthorized port scan detected from IP 198.51.100.4',
    examTip: 'Intrusion Detection Systems (IDS) passively raise alerts; IPS actively blocks threats.'
  },
  {
    word: 'BYTES',
    length: 5,
    difficulty: 'easy',
    category: 'Hardware & Architecture',
    hints: [
      'Category: Memory Storage Units.',
      'Plural form: Groups of 8 consecutive binary digits (bits).',
      'Scale: 1024 of these constitute a Kilobyte (KB).',
      'Letter Clue: 5 letters, starts with "B", ends with "S", contains "Y", "T", "E".'
    ],
    definition: 'Groups of eight binary digits operated on as a unit by computer hardware.',
    example: '1 Kilobyte (KB) = 1024 Bytes; 1 Megabyte (MB) = 1024 KB',
    examTip: 'Memory unit conversion: 1 Nibble = 4 bits, 1 Byte = 8 bits, 1 KB = 1024 Bytes.'
  },
  {
    word: 'FETCH',
    length: 5,
    difficulty: 'medium',
    category: 'Hardware & Architecture',
    hints: [
      'Category: CPU Machine Instruction Cycle.',
      'First Stage: Precedes Decode, Execute, and Store stages.',
      'Action: Retrieves the machine instruction from RAM using the Program Counter (PC) address.',
      'Letter Clue: 5 letters, starts with "F", ends with "H", contains "E", "T", "C".'
    ],
    definition: 'The fundamental operation of retrieving an instruction from RAM into the CPU for processing.',
    example: 'Machine Cycle: Fetch -> Decode -> Execute -> Store',
    examTip: 'Program Counter (PC) register stores the address of the next instruction to be fetched.'
  },
  {
    word: 'DRIVE',
    length: 5,
    difficulty: 'easy',
    category: 'Hardware & Architecture',
    hints: [
      'Category: Secondary Storage Hardware.',
      'Form: Solid-State Drive (SSD) or Hard Disk Drive (HDD).',
      'Role: Provides persistent non-volatile secondary storage retaining data across power cycles.',
      'Letter Clue: 5 letters, starts with "D", ends with "E", contains "R", "I", "V".'
    ],
    definition: 'An electro-mechanical or solid-state device that stores and reads digital computer data.',
    example: 'Solid-State Drive (SSD) using NAND flash memory chips.',
    examTip: 'Secondary storage is non-volatile (permanent), whereas Primary RAM is volatile.'
  },
  {
    word: 'RESET',
    length: 5,
    difficulty: 'easy',
    category: 'Hardware & Architecture',
    hints: [
      'Category: Hardware Signals & System Booting.',
      'Signal: Clears processor registers and sets the Program Counter to the reset vector address.',
      'Warm vs Cold: Warm reset restarts software; cold reset cycles physical power.',
      'Letter Clue: 5 letters, starts with "R", ends with "T", contains two "E"s ("R-E-S-E-T").'
    ],
    definition: 'The action of restoring a hardware device or microprocessor to its initial power-up state.',
    example: 'Hardware reset pin triggers CPU to load the reset vector address.',
    examTip: 'Cold boot involves switching on power; Warm boot is a software reset without cutting power.'
  },
  {
    word: 'CORES',
    length: 5,
    difficulty: 'medium',
    category: 'Hardware & Architecture',
    hints: [
      'Category: Microprocessor Architecture.',
      'Plural form: The individual computing engines fabricated on a single CPU chip.',
      'Capability: Enables true parallel hardware thread execution (Dual-core, Quad-core, Octa-core).',
      'Letter Clue: 5 letters, starts with "C", ends with "S", contains "O", "R", "E".'
    ],
    definition: 'The individual processing engines contained within a multi-core microprocessor.',
    example: 'An 8-core CPU can execute 8 concurrent hardware instruction threads simultaneously.',
    examTip: 'Multi-core architectures enable parallel processing to overcome clock speed thermal limits.'
  },
  {
    word: 'WORDS',
    length: 5,
    difficulty: 'hard',
    category: 'Hardware & Architecture',
    hints: [
      'Category: Computer Word Size Architecture.',
      'Plural form: The natural fixed-width chunk of data a processor processes in one cycle.',
      'Examples: 32-bit and 64-bit word architectures.',
      'Letter Clue: 5 letters, starts with "W", ends with "S", contains "O", "R", "D".'
    ],
    definition: 'The fixed-sized piece of data handled as a single unit by a processor instruction set.',
    example: 'A 64-bit computer has a word size of 64 bits (8 bytes).',
    examTip: 'Word length dictates the maximum addressable physical memory of a microprocessor.'
  },
  {
    word: 'SHELL',
    length: 5,
    difficulty: 'medium',
    category: 'Operating Systems & Software',
    hints: [
      'Category: Operating System Interfaces.',
      'Definition: The command-line interpreter that translates user instructions into system calls.',
      'Examples: Bash, Zsh, Sh on Linux/macOS and PowerShell on Windows.',
      'Letter Clue: 5 letters, starts with "S", ends with double "L", contains "H", "E".'
    ],
    definition: 'A software program that exposes the services of an operating system to a human user or scripts.',
    example: '$ ls -la # Bash shell executing list command via system calls',
    examTip: 'The Shell wraps around the Kernel: User -> Shell -> Kernel -> Hardware.'
  },
  {
    word: 'LINUX',
    length: 5,
    difficulty: 'easy',
    category: 'Operating Systems & Software',
    hints: [
      'Category: Open-Source Operating Systems.',
      'Creator: Developed by Linus Torvalds in 1991.',
      'License: Distributed under the GNU General Public License (GPL); powers servers and Android.',
      'Letter Clue: 5 letters, starts with "L", ends with "X", contains "I", "N", "U".'
    ],
    definition: 'An open-source operating system kernel distributed under GNU General Public License (GPL).',
    example: 'Ubuntu, Fedora, Debian, and Red Hat distributions.',
    examTip: 'FLOSS stands for Free/Libre and Open Source Software (like Linux and Python).'
  },
  {
    word: 'BUILD',
    length: 5,
    difficulty: 'medium',
    category: 'Operating Systems & Software',
    hints: [
      'Category: Software Engineering & DevOps.',
      'Process: Converts human-readable source code into executable binary packages.',
      'Stages: Involves compiling, linking static/dynamic libraries, and bundling assets.',
      'Letter Clue: 5 letters, starts with "B", ends with "D", contains "U", "I", "L".'
    ],
    definition: 'The automated process that compiles, links, and packages software source code for execution.',
    example: '$ npm run build # Compiles TypeScript into bundled production files',
    examTip: 'The Linker step combines compiled object files with external library code.'
  },
  {
    word: 'CLONE',
    length: 5,
    difficulty: 'medium',
    category: 'Operating Systems & Software',
    hints: [
      'Category: Version Control & Git.',
      'Command: Makes a complete local duplicate copy of a remote code repository.',
      'Includes: Downloads all commits, branches, history, and source files.',
      'Letter Clue: 5 letters, starts with "C", ends with "E", contains "L", "O", "N".'
    ],
    definition: 'An exact digital duplicate of a software repository or memory block.',
    example: 'git clone https://github.com/example/cs-class12.git',
    examTip: 'Git is a distributed version control system; each clone contains the full commit history.'
  },
  {
    word: 'STATE',
    length: 5,
    difficulty: 'medium',
    category: 'Operating Systems & Software',
    hints: [
      'Category: Process Lifecycle & Execution.',
      'OS Context: New, Ready, Running, Waiting (Blocked), and Terminated.',
      'Definition: The condition and stored values of a process at a specific snapshot in time.',
      'Letter Clue: 5 letters, starts with "S", ends with "E", contains "T", "A", "T".'
    ],
    definition: 'The complete set of stored values and execution context preserved by a system at a moment in time.',
    example: 'Process State: Ready -> Scheduled by CPU -> Running',
    examTip: 'Process transition: A running process moves to "Waiting" when performing I/O operations.'
  },
  {
    word: 'EVENT',
    length: 5,
    difficulty: 'medium',
    category: 'Operating Systems & Software',
    hints: [
      'Category: GUI & Asynchronous Programming.',
      'Trigger: An action such as a mouse click, keypress, or timer expiry detected by the system.',
      'Handling: Handled through an event loop and callback handler functions.',
      'Letter Clue: 5 letters, starts with "E", ends with "T", contains "V", "E", "N".'
    ],
    definition: 'A software message indicating that something specific has occurred in the system or GUI.',
    example: 'button.bind("<Button-1>", on_click) # Tkinter event binding',
    examTip: 'GUI frameworks rely on event-driven programming rather than purely sequential execution.'
  },
  {
    word: 'LOCKS',
    length: 5,
    difficulty: 'hard',
    category: 'Operating Systems & Software',
    hints: [
      'Category: Multithreading & Synchronization.',
      'Role: Enforces mutual exclusion (Mutex) on shared variables in critical sections.',
      'Risk: Improper lock ordering can result in circular wait and deadlock.',
      'Letter Clue: 5 letters, starts with "L", ends with "S", contains "O", "C", "K".'
    ],
    definition: 'Synchronization primitives that ensure only one thread can access a critical code section at once.',
    example: 'import threading\nmutex = threading.Lock()\nwith mutex:\n    shared_counter += 1',
    examTip: 'Deadlock can occur when multiple threads hold locks and wait cyclically for each other.'
  },
  {
    word: 'TOKEN',
    length: 5,
    difficulty: 'easy',
    category: 'Computer Fundamentals',
    hints: [
      'Category: Lexical Analysis & Python Syntax.',
      'Definition: The smallest individual syntactic element recognized by an interpreter or compiler.',
      'Classification: Keywords, Identifiers, Literals, Operators, and Punctuators.',
      'Letter Clue: 5 letters, starts with "T", ends with "N", contains "O", "K", "E".'
    ],
    definition: 'The smallest discrete element in the source code that is meaningful to the compiler.',
    example: 'sum = a + 5 # 5 tokens: sum, =, a, +, 5',
    examTip: 'Five token categories in Python: Keywords, Identifiers, Literals, Operators, Punctuators/Delimiters.'
  },
  {
    word: 'ASCII',
    length: 5,
    difficulty: 'medium',
    category: 'Computer Fundamentals',
    hints: [
      'Category: Character Encoding Standards.',
      'Acronym: American Standard Code for Information Interchange.',
      'Specification: 7-bit standard mapping 128 characters to numbers ("A" is 65, "a" is 97).',
      'Letter Clue: 5 letters, starts with "A", ends with double "I", contains "S", "C".'
    ],
    definition: 'A character encoding standard that assigns numeric codes from 0 to 127 to textual characters.',
    example: 'ord("A") # returns 65\nchr(65)  # returns "A"',
    examTip: 'ASCII uses 7 bits (128 characters), whereas Unicode/UTF-8 covers international multilingual alphabets.'
  },
  {
    word: 'MOUSE',
    length: 5,
    difficulty: 'easy',
    category: 'Hardware & Architecture',
    hints: [
      'Category: Computer Peripherals & Pointing Devices.',
      'Invention: Invented in 1964 by Douglas Engelbart.',
      'Mechanism: Detects 2D surface motion to control an on-screen cursor.',
      'Letter Clue: 5 letters, starts with "M", ends with "E", contains "O", "U", "S".'
    ],
    definition: 'A hand-operated electronic pointing device that detects two-dimensional motion relative to a surface.',
    example: 'Triggers click, double-click, drag, and scroll events in operating systems.',
    examTip: 'Input devices convert human actions into digital signals the CPU can understand.'
  },
  {
    word: 'MACRO',
    length: 5,
    difficulty: 'medium',
    category: 'Computer Fundamentals',
    hints: [
      'Category: Preprocessors & Automation.',
      'Concept: A single pattern rule that expands into a larger sequence of instructions.',
      'Usage: Common in C/C++ preprocessors (#define) and office spreadsheet automation.',
      'Letter Clue: 5 letters, starts with "M", ends with "O", contains "A", "C", "R".'
    ],
    definition: 'A programmable shortcut rule that specifies how certain input sequences map to replacement outputs.',
    example: '#define MAX(a, b) ((a) > (b) ? (a) : (b))',
    examTip: 'Macros in office productivity software can sometimes be exploited as malware vectors (Macro Viruses).'
  },
  {
    word: 'ADMIN',
    length: 5,
    difficulty: 'easy',
    category: 'Operating Systems & Software',
    hints: [
      'Category: User Access Control & System Rights.',
      'Role: A superuser account possessing unrestricted rights over configurations and users.',
      'Synonyms: Called "root" in Unix/Linux; "DBA" in relational database systems.',
      'Letter Clue: 5 letters, starts with "A", ends with "N", contains "D", "M", "I".'
    ],
    definition: 'A user account with full root authorization to configure system settings and assign permissions.',
    example: 'sudo apt update # Elevates commands to administrator (root) privileges',
    examTip: 'DBA (Database Administrator) is responsible for schema design, backups, and user access privileges.'
  },
  {
    word: 'MODEL',
    length: 5,
    difficulty: 'medium',
    category: 'Artificial Intelligence',
    hints: [
      'Category: Machine Learning & Artificial Intelligence.',
      'Definition: A mathematical representation trained on data to recognize patterns or generate content.',
      'Types: Neural networks, Large Language Models (LLMs), decision trees, linear regression.',
      'Letter Clue: 5 letters, starts with "M", ends with "L", contains "O", "D", "E".'
    ],
    definition: 'A trained statistical or neural algorithm capable of making predictions or inferences from input data.',
    example: 'model.fit(X_train, y_train)\npredictions = model.predict(X_test)',
    examTip: 'Overfitting occurs when a model learns training noise rather than generalizable patterns.'
  }
];

// Sanity check filter to guarantee every single CS word strictly matches ^[A-Z]{5}$
export const VALIDATED_5_LETTER_CS_WORDS: WordEntry[] = CS_WORDS.filter(w => isStrictly5LetterWord(w.word));

export const CS_WORDS_MAP: Record<string, WordEntry> = VALIDATED_5_LETTER_CS_WORDS.reduce((acc, entry) => {
  acc[entry.word] = entry;
  return acc;
}, {} as Record<string, WordEntry>);

/**
 * Generate infinite progressive educational hints for a 5-letter word.
 * Never runs out, never requires an external AI API, and always 100% matches the target answer!
 */
export function getProgressiveHint(entry: WordEntry, hintLevel: number): string {
  if (hintLevel < entry.hints.length) {
    return entry.hints[hintLevel];
  }

  const extraIndex = hintLevel - entry.hints.length;
  const word = entry.word;
  const vowels = word.split('').filter(c => 'AEIOU'.includes(c));

  switch (extraIndex % 5) {
    case 0:
      return `Academic Definition: ${entry.definition}`;
    case 1:
      return `Class 12 Board Exam Tip: ${entry.examTip}`;
    case 2:
      return `Letter Structure: This 5-letter word contains ${vowels.length} vowel(s): [${Array.from(new Set(vowels)).join(', ')}].`;
    case 3:
      return `First & Last Letters: Begins with the letter "${word[0]}" and terminates with "${word[4]}".`;
    case 4:
    default:
      return `Practical Application: ${entry.example.split('\n')[0]}`;
  }
}

/**
 * Fast verification helper: validates that a guess contains exactly 5 letters.
 */
export function isValid5LetterGuess(word: string): boolean {
  return isStrictly5LetterWord(word);
}
