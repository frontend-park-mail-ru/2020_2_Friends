package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	http.ServeFile(w, r, "index.html")
}

func main() {
	http.HandleFunc("/", handler)

	staticHandler := http.StripPrefix(
		"/src/",
		http.FileServer(http.Dir("./src")),
	)
	http.Handle("/src/", staticHandler)

	fmt.Println("starting server at :8080")
	http.ListenAndServe(":8080", nil)
}
