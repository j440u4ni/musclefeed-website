<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <title>Muscle Feed</title>
        <link rel="stylesheet" type="text/css" href="{{ asset('css/application.css').'?'.time() }}" />
        <link rel="icon" type="image/png" href="{{ asset('images/favicon@2x.png') }}"/>
    </head>
    <body>
        <div id="runner"></div>
        <script type="text/javascript" src="{{ asset('js/application.js').'?'.time() }}"></script>
    </body>
</html>
