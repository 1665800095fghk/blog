---
title: "Algorithm-Template"
description: "记录算法竞赛用到的板子"
pubDate: "2023-12-2"
updatedDate: "2023-12-2"
tags: ["algorithm"]
---

# Saleri的竞赛板子
## dfs
基础dfs
```cpp
int n;
void dfs(int x) {
	if(...) return; // 减枝
	if(x ... n) {
		// .....
		return;
	}
	...
	dfs(x...);
}
```
例: 全排列
```cpp
int n;
vector<int> v;
vector<bool> st;
void dfs(int x) {
	if(x > n) {
		for(int i = 1; i <= n; ++i) 
			cout << v[i] << " ";
		cout << endl;
		return;
	}
	for(int i = 1; i <= n; ++i) {
		if(!st[i]) {
			v[x] = i;
			st[i] = true;
			dfs(x+1);
			st[i] = false;
		}
	}
}
```
迷宫类
```cpp
int n, m;
vector<string> v;
vector<vector<bool>> st;
int dx[] = {-1, 0, 1, 0};
int dy[] = {0, 1, 0, -1};
void dfs(int x, int y) {
	for(int i  = 0; i < 4; ++i) {
		int a = x + dx[i];
		int b = y + dy[i];
		if(a < 0 || a >= n || b < 0 || b >= n)
			continue;
		// ... 做一些其他的判断
		st[a][b] = true;
		// ...
		dfs(a, b);
	}
}
```
## String
hash
```cpp
const int M = 1e9 + 7;
const int B = 233;
typedef long long ll;
int get_hash(const string &s) {
	int res = 0;
	for(int i = 0; i < s.size(); ++i)
		res = ((ll)res * B + s[i] % M);
	return res;
}
```
字典树(trie)
```cpp
struct trie {
	int nex[100010][26], cnt;
	bool exist[100010];
	void insert(char *s) {
		int p = 0;
		for(int i = 0 ; s[i]; ++i) {
			int c = s[i] - 'a';
			if(!nex[p][c])
				nex[p][c] = ++cnt;
			p = ch[p][c];
		}
		exist[p] = 1;
	}
	bool find(char *s) {
		int p = 0;
		for(int i = 0; s[i]; ++i) {
			int c = s[i] - 'a';
			if(!nex[p][c])
				return false;
			p = nex[p][c];
		}
		return exist[p][c];
	}
}
```
前缀函数和Kmp
```cpp
vector<int> prefix_function(string s) {
	int n = (int)s.length();
	vector<int> v(n);
	for(int i = 1; i < n; ++i) {
		int j = v[i - 1];
		while(j > 0 && s[i] != s[j])
			j = v[j - 1];
		if(s[i] == s[j])
			j++;
		v[i] = j;
	}
	return v;
}

vector<int> find_count(string text, string pattern) {
	string cur = pattern + '#' + str;
	int sz1 = text.size(), sz2 = pattern.szie();
	vector<int> v, lps = prefix_function(cur);
	for(int i = sz2 + 1; i <= sz1 + sz2; ++i) {
		if(lps[i] == sz2) {
			v.push_back(i - 2 * sz2);
		}
	}
	return v;
}
```
## 二分
整数二分
```cpp
int binary_search(vector<int> v) {
	int l = 0, r = v.size() - 1;
	while(l < r) {
		int mid = l + (r-l) / 2;
		if(check...)
			r = mid;
		else
			l = mid + 1;
	}
	return l;
}
```
浮点二分
```cpp
double l = 0, r = 1e9;
while(r - l > 1e-8) {
	double mid = l + (r - l) / 2;
	if(check...)
		r = mid;
	else
		l = mid + 1;
}
return l;
```
## 高精度
```cpp
vector<int> add(vector<int> A, vector<int> B) {
	vector<int> C;
	int t = 0;
	for(int i = 0; i < A.size() || i < B.size(); ++i) {
		if(i < A.size())
			t+=A[i];
		if(i < B.size())
			t+=B[i];
		C.push_back(t%10);
		t /= 10;
	}
	if(t)
		C.push_back(1);
	return C;
}
```
## 图
链式前向星
```cpp
struct Edge {
int next; // 下条边的编号
int to; // 下条边的终点
int w; // 这条边的权值
};
int n, m;
vector<int> head; // 节点，存储指向边的下标
vector<Edge> e; // 边，指向下一个同属一个节点的边
vector<bool> vis; // dfs 需要
int tot = 0;
void add(int u, int v, int w) {
	++tot;
	e[tot].next = head[u];
	e[tot].w = w;
	e[tot].to = v;
	head[u] = tot;
}
bool find_edge(int u, int v) {
	for (int j = head[u]; j != -1; j = e[j].next) {
		if (e[j].to == v) {
			return true;
		}
	}
	return false;
}
void dfs(int u) {
	cout << u << " ";
	vis[u] = true;
	for (int i = head[u]; i != -1; i = e[i].next) {
		if (!vis[e[i].to]) {
			dfs(e[i].to);
		}
	}
}
int main() {
	std::ios::sync_with_stdio(false), cin.tie(0);
	cin >> n >> m;
	head.resize(n + 1, -1);
	vis.resize(m + 1, false);
	e.resize(m + 1);
	for (int i = 1; i <= m; ++i) {
		int u, v, w;
		cin >> u >> v >> w;
		add(u, v, w);
	}
	// for (int i = 1; i <= n; ++i) {
	// for (int j = head[i]; j != -1; j = e[j].next) {
	// cout << j << " ";
	// }
	// cout << endl;
	// }
	dfs(1);
}
```
邻接表
```cpp
int n, m;
vector<bool> vis;
vector<vector<int>> adj;
bool find_edge(int u, int v) {
  for (int i = 0; i <= adj[u].size(); ++i) {
    if (adj[u][v] == v) {
      return true;
    }
  }
  return false;
}
void dfs(int u) {
  if (vis[u])
    return;
  vis[u] = true;
  for (int i = 0; i < adj[u].size(); ++i)
    dfs(adj[u][i]);
}
int main() {
  std::ios::sync_with_stdio(false), cin.tie(0);
  cin >> n >> m;
  vis.resize(n + 1, false);
  adj.resize(n + 1);
  for (int i = 1; i <= m; ++i) {
    int u, v;
    cin >> u >> v;
    adj[u].push_back(v);
  }
}
```
邻接矩阵
```cpp
int n, m;
vector<bool> vis;
vector<vector<bool>> adj;
bool find_edge(int u, int v) { return adj[u][v]; }
void dfs(int u) {
  if (vis[u])
    return;
  vis[u] = true;
  for (int v = 1; v <= n; ++v) {
    if (adj[u][v]) {
      dfs(v);
    }
  }
}
int main() {
  std::ios::sync_with_stdio(false), cin.tie(0);
  cin >> n >> m;

  vis.resize(n + 1, false);
  adj.resize(n + 1, vector<bool>(n + 1, false));

  for (int i = 1; i <= m; ++i) {
    int u, v;
    cin >> u >> v;
    adj[u][v] = true;
  }
}
```
## 计算几何
Point
```cpp
struct Point {
	double x{}, y{};
	Point() = default;
	Point(double x, double y): x(x), y(y) {};
	bool operator<(Point rhs) {
		if(x != rhs.x)
			return x < rhs.x;
		return y < rhs.y;
	}
	Point getMid(Point rhs) {
		return {(x+rhs.x)/2, (y+rhs.y)/2};
	}
};
```
Line
```cpp
struct Line {
	double A{}, B{}, C{};
	Line() = default;
	Line(double A, double B, double C): A(A), B(B), C(C) {};
	bool T(Line rhs) {
		return A * rhs.A + B * rhs.B == 0;
	}
}
```
## 数据结构
并查集(dsu)
```cpp
int fa[100010];
void init(int n) {
	for(int i = 1; i <= n; ++i)
		fa[i] = i;
}
int find(int x) {
	return fa[x] == x ? x : fa[x] = find(fa[x]);
}
void merge(int i, int j) {
	fa[find(i)] = find(j);
}
```
例: P1551，亲戚
```cpp
int n, m, p, x, y;
// 省略 dsu部分
cin >> n >> m >> p;
while(n--) {
	cin >> x >> y;
	// 构建亲戚关系树
	merge(x, y);
}
while(p--) {
	cin >> x >> y;
	// 查询两个人是否有亲戚关系
	cout << (find(x) == find(y) ? "Yes" : "No") << endl;
}
```
