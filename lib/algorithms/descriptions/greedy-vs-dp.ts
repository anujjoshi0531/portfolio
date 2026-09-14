const description = `Greedy vs Dynamic Programming

Both Greedy and DP solve optimization problems, but they differ fundamentally:

Greedy:
  - Makes the locally optimal choice at each step
  - Fast: usually O(n log n) or O(n)
  - Does NOT always find the global optimum
  - Works when the "greedy choice property" holds

Dynamic Programming:
  - Considers ALL possible choices
  - Finds the globally optimal solution — always
  - Slower: usually O(n × m) time and space
  - Works for problems with overlapping subproblems

Example — Coin Change with coins [1, 4, 6], amount 8:
  Greedy picks 6+1+1 = 3 coins (suboptimal!)
  DP finds 4+4 = 2 coins (optimal!)`

export default description
