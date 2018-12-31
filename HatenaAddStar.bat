@echo "■星追加スクリプト■"



@REM はてなユーザ名
@set USER=name
@REM はてなパスワード
@set PASS=pass

@REM 星をつけるサイト数
@set NUM=10
@REM Google検索キーワード
@set KEYWORD=



@echo -
@echo ■■■■■■■■■■■■■■
@echo 処理中です。しばらくお待ちください。(サイト1件につき３～５秒）かかります。
@echo ■■■■■■■■■■■■■■
@echo -

call npx . %USER% %PASS% %NUM% %KEYWORD%

@echo -
@echo ■■■■■■■■■■■■
@echo 終了しました。
@echo ■■■■■■■■■■■■
@echo -

pause