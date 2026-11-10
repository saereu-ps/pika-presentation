#!/usr/bin/env python3
"""
PIKA Executive Presentation & Auto-Demo Server
Serves presentation/index.html locally on port 8085 (or custom port).
Usage:
    python3 presentation/serve.py [port]
"""

import sys
import os
import http.server
import socketserver
import webbrowser

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8085
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

socketserver.TCPServer.allow_reuse_address = True

class PresentationHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Default root '/' to '/index.html'
        if self.path == "/" or self.path == "":
            self.path = "/index.html"
        return super().do_GET()

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

def run():
    target_ports = [PORT, 8085, 8086, 8088, 3000, 5173]
    # Remove duplicates preserving order
    ports_to_try = []
    for p in target_ports:
        if p not in ports_to_try:
            ports_to_try.append(p)

    httpd = None
    active_port = PORT
    for p in ports_to_try:
        try:
            httpd = socketserver.TCPServer(("0.0.0.0", p), PresentationHandler)
            active_port = p
            break
        except OSError:
            continue

    if not httpd:
        print(f"❌ Error: Unable to bind to any port in {ports_to_try}")
        sys.exit(1)

    url_localhost = f"http://localhost:{active_port}/"
    url_loopback = f"http://127.0.0.1:{active_port}/"

    print("=" * 66)
    print("🎬 PIKA Executive Presentation & Auto-Demo Server is READY!")
    print(f"👉 Direct Presentation Link: {url_localhost}")
    print(f"👉 Alternative IP Link:     {url_loopback}")
    print("=" * 66)
    print("Press Ctrl+C to stop the server anytime.")

    try:
        webbrowser.open(url_localhost)
    except Exception:
        pass

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping presentation server... Done.")

if __name__ == "__main__":
    run()
