export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md bg-white shadow-xl rounded-3xl p-8 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          {" "}
          Нещо се обърка при зареждането на страницата.
        </h1>
        <p className="text-gray-700 mb-2">
          Свържете се с администратора на сайта, за да разрешите проблема.
        </p>

        <a
          href="/"
          className="inline-block mt-6 bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          Обратно към началото
        </a>
      </div>
    </div>
  );
}
