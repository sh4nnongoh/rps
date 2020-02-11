package main

import (
	"bufio"
	"flag"
	"fmt"
	"log"
	"time"

	"github.com/valyala/fasthttp"
)

var (
	addr     = flag.String("addr", ":8080", "TCP address to listen to")
	compress = flag.Bool("compress", false, "Whether to enable transparent response compression")
)

func main() {
	flag.Parse()

	h := requestHandler
	if *compress {
		h = fasthttp.CompressHandler(h)
	}

	if err := fasthttp.ListenAndServe(*addr, h); err != nil {
		log.Fatalf("Error in ListenAndServe: %s", err)
	}
}

func requestHandler(ctx *fasthttp.RequestCtx) {
	switch string(ctx.Path()) {
	case "/sse":
		fmt.Fprintf(ctx, "{")
		fmt.Fprintf(ctx, "path: %q", ctx.Path())
		fmt.Fprintf(ctx, "}\n")
		ctx.SetContentType("application/json")
		ctx.SetStatusCode(200)
		ctx.Response.Header.Set("connection", "keep-alive")
		ctx.Response.Header.Set("cache-control", "no-cache")
		// Send the response in chunks and wait for a second between each chunk.
		ctx.SetBodyStreamWriter(func(w *bufio.Writer) {
			for i := 0; i < 100; i++ {
				fmt.Fprintf(w, "this is a message number %d\n", i)
				// Do not forget flushing streamed data to the client.
				if err := w.Flush(); err != nil {
					return
				}
				time.Sleep(2 * time.Second)
			}
		})
	default:
		fmt.Fprintf(ctx, "Hello, world!\n\n")

		fmt.Fprintf(ctx, "Request method is %q\n", ctx.Method())
		fmt.Fprintf(ctx, "RequestURI is %q\n", ctx.RequestURI())
		fmt.Fprintf(ctx, "Requested path is %q\n", ctx.Path())
		fmt.Fprintf(ctx, "Host is %q\n", ctx.Host())
		fmt.Fprintf(ctx, "Query string is %q\n", ctx.QueryArgs())
		fmt.Fprintf(ctx, "User-Agent is %q\n", ctx.UserAgent())
		fmt.Fprintf(ctx, "Connection has been established at %s\n", ctx.ConnTime())
		fmt.Fprintf(ctx, "Request has been started at %s\n", ctx.Time())
		fmt.Fprintf(ctx, "Serial request number for the current connection is %d\n", ctx.ConnRequestNum())
		fmt.Fprintf(ctx, "Your ip is %q\n\n", ctx.RemoteIP())

		fmt.Fprintf(ctx, "Raw request is:\n---CUT---\n%s\n---CUT---", &ctx.Request)

		ctx.SetContentType("text/plain; charset=utf8")

		// Set arbitrary headers
		ctx.Response.Header.Set("X-My-Header", "my-header-value")

		// Set cookies
		// var c fasthttp.Cookie
		// c.SetKey("cookie-name")
		// c.SetValue("cookie-value")
		// ctx.Response.Header.SetCookie(&c)
	}
}
