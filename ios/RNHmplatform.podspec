# react-native-hmplatform.podspec

require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "RNHmplatform"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  react-native-hmplatform for hessian health manager App
                   DESC
  s.homepage     = package['homepage']
  # brief license entry:
  s.license      = "MIT"
  # optional - use expanded license entry instead:
  # s.license    = { :type => "MIT", :file => "LICENSE" }
  s.authors      = package['author']
  s.platforms    = { :ios => "10.0" }
  s.source       = { :git => "https://github.com/smiletomyself/react-native-hmplatform.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,c,cc,cpp,m,mm,swift}"
  s.requires_arc = true

  s.dependency "React"
  s.dependency "React-Core"
  # ...
  # s.dependency "..."
end

