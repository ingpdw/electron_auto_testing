# Compass 플러그인 추가
# require 'compass-normalize'
# require 'breakpoint'

# CSS 파일 기본 인코딩(Default Encoding) 설정
# Windows에서 한글, 일어, 중국어 등 SCSS 파일을 CSS로 컴파일 시 문자 인코딩 에러가 생길 경우
# 아래 코드를 설정하여 기본 인코딩을 UTF-8로 설정하면 문제가 해결됨.
Encoding.default_external = "utf-8"

# 프로젝트 내 폴더 경로 지정
http_path = "/"
css_dir = ""
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "javascripts"

# Bower 패키지 매니저 Compass에서 활용 https://coderwall.com/p/bhb0pq
# extensions_dir = "bower_components"

# SASS => CSS 변경 시에 변경되는 아웃풋 스타일 설정
# :expanded :nested :compact :compressed
 output_style = :compact

# 상대 경로 지정 설정
relative_assets = true

# 변경된 내용 주석 처리 여부
line_comments = false


# 우선시 할 문법 모드 선택
# :sass :scss
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass

# 들여쓰기 구문인 *.sass 문법을 선호한다면 아래 주석을 비활성화 합니다.
# project again passing --syntax sass
# 또는 아래 주석을 비활성화 합니다.
# preferred_syntax = :sass
# 그리고 아래 주석을 비활성화해서 명령어를 실행합니다.
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass



#================================================#
#Section: Compass Spriting Rules                 #
#================================================#

# on_sprite_saved do |filename|
#            # Make a copy of sprites with a name that has no uniqueness of the hash
#            if File.exists?(filename)
#                      FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
#                       FileUtils.rm_rf(filename)
#            end
# end

# on_stylesheet_saved do |filename|
#            # Replace in stylesheets generated references to sprites
#            # by their counterparts without the hash uniqueness.
#            if File.exists?(filename)
#                      css = File.read filename
#                      File.open(filename, 'w+') do |f|
#                                 f << css.gsub(%r{(?<start>-s)(?<hash>[a-z0-9]{10})(?<file>\.png)}, '.png?v=\k<hash>')
#                      end
#            end
# end



#================================================#
#Section: random                                 #
#================================================#
# module Sass::Script::Functions
# 	def random(max = Sass::Script::Number.new(10))
# 		Sass::Script::Number.new(rand(max.value), max.numerator_units, max.denominator_units)
# 	end
# end