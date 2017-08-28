desc 'Build and run the site locally'
task :serve do
  sh "bundle exec jekyll serve"
end

desc 'Build the site'
task :build, :env do |t,args|
  environment = args[:env] || 'development'
  sh "JEKYLL_ENV=#{environment} bundle exec jekyll build"
end

desc 'Run HTML Proofer over the built site'
task validate: :build do
  sh "bundle exec htmlproofer ./_site --disable-external"
end
