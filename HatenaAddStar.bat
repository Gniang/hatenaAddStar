@echo "�����ǉ��X�N���v�g��"



@REM �͂Ăȃ��[�U��
@set USER=name
@REM �͂Ăȃp�X���[�h
@set PASS=pass

@REM ��������T�C�g��
@set NUM=10
@REM Google�����L�[���[�h
@set KEYWORD=



@echo -
@echo ����������������������������
@echo �������ł��B���΂炭���҂����������B(�T�C�g1���ɂ��R�`�T�b�j������܂��B
@echo ����������������������������
@echo -

call npx . %USER% %PASS% %NUM% %KEYWORD%

@echo -
@echo ������������������������
@echo �I�����܂����B
@echo ������������������������
@echo -

pause