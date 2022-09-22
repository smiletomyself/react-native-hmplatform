
Pod::Spec.new do |s|
  s.name         = "RNHmplatform"
  s.version      = "1.0.0"
  s.summary      = "RNHmplatform"
  s.description  = <<-DESC
                  A common WebView extended by ImagePicker for React Native (Android and iOS platform).
                   DESC
  s.homepage     = "https://github.com/smiletomyself/react-native-hmplatform/blob/main/README.md"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "zhuxing" => "smiletomyself@163.com" }
  s.platform     = :ios, "10.0"
  s.source       = { :git => "https://github.com/smiletomyself/react-native-hmplatform.git", :tag => "#{s.version}" }
  s.source_files  = "RNHmplatform/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

  