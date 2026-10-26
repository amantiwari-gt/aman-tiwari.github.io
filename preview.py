"""Local-only preview, including the GitHub Pages project path and 404 page."""
from argparse import ArgumentParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent
BASE = '/aman-tiwari.github.io/'


class PreviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def translate_path(self, path):
        if path.startswith(BASE):
            path = '/' + path[len(BASE):]
        return super().translate_path(path)

    def do_GET(self):
        path = urlsplit(self.path).path
        if any(part.startswith('.') for part in path.split('/') if part):
            self.send_error(404)
        elif path == '/':
            self.send_response(302)
            self.send_header('Location', BASE)
            self.end_headers()
        else:
            super().do_GET()

    def send_error(self, code, message=None, explain=None):
        if code == 404:
            page = (ROOT / '404.html').read_bytes()
            self.send_response(404)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(page)))
            self.end_headers()
            if self.command != 'HEAD':
                self.wfile.write(page)
        else:
            super().send_error(code, message, explain)


if __name__ == '__main__':
    parser = ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=4174)
    args = parser.parse_args()
    server = ThreadingHTTPServer(('127.0.0.1', args.port), PreviewHandler)
    print(f'Local portfolio: http://127.0.0.1:{args.port}{BASE}', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
